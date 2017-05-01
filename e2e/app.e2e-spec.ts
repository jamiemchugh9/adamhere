import { Project105Page } from './app.po';

describe('project105 App', function() {
  let page: Project105Page;

  beforeEach(() => {
    page = new Project105Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
