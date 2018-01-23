import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for angular-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be angular-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('angular-app');
    })
  });

  it('navbar-brand should be kibaati-ledger@0.0.1',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('kibaati-ledger@0.0.1');
  });

  
    it('Item component should be loadable',() => {
      page.navigateTo('/Item');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Item');
    });

    it('Item table should have 7 columns',() => {
      page.navigateTo('/Item');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });

  

});
