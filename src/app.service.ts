import { Injectable } from '@nestjs/common';
import { curly } from 'node-libcurl';
import { parse } from 'node-html-parser';
import puppeteer from 'puppeteer-core';
import { executablePath } from 'puppeteer';

@Injectable()
export class AppService {
  async getHello(): Promise<any> {
    return 'Hello World';
  }
}
