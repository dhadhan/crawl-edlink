// import puppeteer from 'puppeteer-core';
// import { EMAIL, PASSWORD } from '$env/static/private'
import { executePath } from '$env/static/private'
import { addExtra } from 'puppeteer-extra'
import chromium from 'chrome-aws-lambda';

const puppeteerExtra = addExtra(chromium.puppeteer)

import 'puppeteer-extra-plugin-stealth/evasions/chrome.app';
import 'puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes';
import 'puppeteer-extra-plugin-stealth/evasions/chrome.csi';
import 'puppeteer-extra-plugin-stealth/evasions/chrome.runtime';
import 'puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow';
import 'puppeteer-extra-plugin-stealth/evasions/media.codecs';
import 'puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency';
import 'puppeteer-extra-plugin-stealth/evasions/navigator.languages';
import 'puppeteer-extra-plugin-stealth/evasions/navigator.permissions';
import 'puppeteer-extra-plugin-stealth/evasions/navigator.plugins';
import 'puppeteer-extra-plugin-stealth/evasions/navigator.vendor';
import 'puppeteer-extra-plugin-stealth/evasions/navigator.webdriver';
import 'puppeteer-extra-plugin-stealth/evasions/sourceurl';
import 'puppeteer-extra-plugin-stealth/evasions/user-agent-override';
import 'puppeteer-extra-plugin-stealth/evasions/webgl.vendor';
import 'puppeteer-extra-plugin-stealth/evasions/window.outerdimensions';
import 'puppeteer-extra-plugin-stealth/evasions/defaultArgs';
import 'puppeteer-extra-plugin-user-preferences';
import 'puppeteer-extra-plugin-user-data-dir';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

export const Crawl = async (url, email, pass, reUrl) => {
  const browser = await puppeteerExtra.use(StealthPlugin()).launch({ 
    headless: chromium.headless,
    defaultViewport: chromium.defaultViewport,
    executablePath: executePath || await chromium.executablePath,
    args: [...chromium.args, "--disable-notifications"],
    ignoreHTTPSErrors: true
  });
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForSelector('[type=email]');
  await page.type('[type=email]', email);
  await page.type('[type=password]', pass);
  await page.click('[type=submit]');

  await page.waitForNavigation();
  await page.goto(reUrl); //Sistem Informasi Manajemen 'https://edlink.id/panel/classes/329517'
  const PresensiSelector = '#body-content > div:nth-child(4) > div > div > div > div.container > div > div:nth-child(3) > div:nth-child(3) > div.box.is-boxed-3 > p.font-14.font-w-600.has-text-secondary'
  await page.waitForSelector(PresensiSelector);
  const infoKelas = await page.evaluate(() => {
    const codeKelas = document.querySelector('#body-content > div:nth-child(4) > div > div > div > div:nth-child(1) > section > div > div > div > div > div:nth-child(4) > div.column.is-narrow > a > p.title.font-14').textContent
    const kelas = document.querySelector('#body-content p.title.font-24.font-w-600').textContent.trim();
    const dosen = document.querySelector('#body-content div:nth-child(4) div:nth-child(2) p.title.font-14 span span').textContent;
    return {kelas,codeKelas,dosen}
  })

  await page.click(PresensiSelector);

  const datas = await page.evaluate(() => {
    const dataAbsen = Array.from(document.querySelectorAll('div.modal.is-active > div.animation-content.modal-content > div > section > div'));
    const absensi = dataAbsen.map((absen) => {
      const sesi = absen.querySelector('div > div:nth-child(1) > div:nth-child(1) > span > a > span').textContent;
      const statusElement = absen.querySelector('div > div:nth-child(2) > div > p');
      const status = statusElement ? statusElement.textContent.trim() : "";
      const timesElement = absen.querySelector('div > div:nth-child(1) > div:nth-child(3) > div');
      const times = timesElement.textContent.trim();
      return { sesi, status, times };
    });
    return absensi;
  });
  await browser.close();
  return {infoKelas,datas};
};

export const getObject = (obj, nameToSearch) => {
	const foundObject = obj.mata_kuliah.find(
		(item) => item.name === nameToSearch
	  );
	  return foundObject ? foundObject : null;
}