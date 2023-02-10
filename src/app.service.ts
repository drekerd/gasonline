import { Injectable } from '@nestjs/common';
import { curly } from 'node-libcurl';
import { parse } from 'node-html-parser';
import puppeteer from 'puppeteer-core';
import { executablePath } from 'puppeteer';

@Injectable()
export class AppService {
  async getHello(): Promise<any> {
    // const { statusCode, data, headers } = await curly.get(
    //   'https://www.maisgasolina.com/posto/2463/',
    // );

    // console.log(data);
    const ob = await pup();

    const htmlObject = parse(ob);
    // // const htmlObject = document.createElement('div');
    // // htmlObject.innerHTML = data;
    // // htmlObject.getElementById("myDiv").style.marginTop = something;z

    // const gasolina95 = Array.from(htmlObject.querySelectorAll('.preco')).filter(
    //   (a) => a.querySelector('.nome').text === 'Gasolina 95 Simples',
    // );

    const data = {
      location: htmlObject.querySelector('[itemprop="name"]').textContent,
    };

    data['fuels'] = Array.from(htmlObject.querySelectorAll('.preco')).map(
      (fuel) => {
        return {
          type: fuel.querySelector('.nome').textContent,
          price: fuel.querySelector('.valor').textContent,
        };
      },
    );

    console.log('fuels: ', data);

    // Array.from(document.querySelectorAll('.preco')).filter(a => console.log(a.querySelector('.nome').innerText === 'Gasolina 95 Simples'))

    return data;
  }
}

async function pup() {
  return '<div class="name"><div class="brand prio"></div><h1 itemprop="name">Prio - Canelas</h1><meta itemprop="logo" content="https://static.maisgasolina.com/icones/prio.png"><meta itemprop="image" content="https://static.maisgasolina.com/gfx/social-home.jpg"><meta itemprop="url" content="https://www.maisgasolina.com/posto/2463/"><div class="actions isLogged"><a href="/erro-posto/2463/" class="icon tooltip error"><span>Comunicar erro com este posto</span></a><a href="/actualizar-precos/2463/" class="icon tooltip prices"><span>Actualizar preços</span></a><div class="favContainer"><div class="icon tooltip fav" data-type="add"><span>Adicionar aos favoritos</span></div><div class="icon tooltip favDel" data-type="del"><span>Remover dos favoritos</span></div><div class="load"></div></div></div><div class="clear"></div></div><div class="info"><div class="morada"><div class="icon tooltip"><span>Morada</span></div><div itemprop="address" itemscope="" itemtype="http://schema.org/PostalAddress"><span itemprop="streetAddress">Rua das Lages, 1165</span><br><span itemprop="postalCode">4410-272</span> <span itemprop="addressLocality">Canelas - V. N. Gaia</span></div></div><div class="clear"></div><div class="horario"><div class="icon tooltip"><span>Horário</span></div><div><meta itemprop="openingHours" content="Mo-Su, 07:00-23:00">Aberto das 07:00 às 23:00</div></div></div><div class="precos"><div class="preco"><div class="nome">Gasolina 95 Simples</div><div class="sc95 tooltip"><span>Gasolina 95 Simples</span></div><div class="valor">€<div class="encoded" data-price="UvMjAxLjcxOQ==">1.719</div></div></div><div class="preco"><div class="nome">Gasolina 95 +</div><div class="sc95plus tooltip"><span>Gasolina 95 +</span></div><div class="valor">€<div class="encoded" data-price="knMTgxLjYzOQ==">1.639</div></div></div><div class="preco"><div class="nome">Gasóleo Simples</div><div class="diesel tooltip"><span>Gasóleo Simples</span></div><div class="valor">€<div class="encoded" data-price="EsMTIxLjYxOQ==">1.619</div></div></div><div class="preco"><div class="nome">Gasóleo +</div><div class="dplus tooltip"><span>Gasóleo +</span></div><div class="valor">€<div class="encoded" data-price="9DMTQxLjU2OQ==">1.569</div></div></div><div class="preco"><div class="nome">GPL Auto</div><div class="gpl tooltip"><span>GPL Auto</span></div><div class="valor">€<div class="encoded" data-price="evMTUwLjg4OQ==">0.889</div></div></div></div><div class="priceInfo"><div class="price-average"><div class="statsDown icon"></div><a href="/estatisticas-dos-combustiveis/">Preços abaixo da média nacional</a></div><div class="actualizacao"><div class="icon tooltip"><span>Última Actualização</span></div>Preços actualizados a 6 de Fevereiro de 2023 por tumbas</div></div><div class="clear"></div>';
  const browser = await puppeteer.launch({ executablePath: executablePath() });

  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({
    'accept-language': 'pt-PT,pt;q=0.9,en-US;q=0.8,en;q=0.7,pt-BR;q=0.6',
    'user-agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
  });

  await page.goto('https://www.maisgasolina.com/posto/2463/');

  await page.screenshot({ path: 'image.png' });

  const productData = await page.evaluate(() => {
    // const gasolinaSimples = Array.from(
    //   document.querySelectorAll('.preco'),
    // ).filter(
    //   (a) => a.querySelector('.nome').textContent === 'Gasolina 95 Simples',
    // );
    return document.querySelector('.box.main').innerHTML;
  });
  await browser.close();
  return productData;
}
