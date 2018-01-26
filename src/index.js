import $ from 'jquery';
import handlebars from 'handlebars/dist/handlebars';

(() => {
  const root = document.getElementById('root');
  const templateMarkup = $('#timeline-template').html();
  const articlesTemplate = handlebars.compile(templateMarkup);
  const monthNames = ['leden', 'únor', 'březen', 'duben', 'květen', 'červen',
    'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'];

  $.getJSON('./data.json', (data) => {
    const articlesData = {};
    for (let i = 0, len = data.feeds.length; i < len; i += 1) {
      const item = data.feeds[i];
      const month = monthNames[parseInt(item.date.month, 10) - 1];
      if (!articlesData[item.date.year]) {
        articlesData[item.date.year] = {};
      }
      if (!articlesData[item.date.year][month]) {
        articlesData[item.date.year][month] = [];
      }
      articlesData[item.date.year][month].push(item);
    }
    $(root).html(articlesTemplate(articlesData));
    $(root).find('.article').on('click', (e) => {
      if (!$(e.target).is('a')) {
        $(e.currentTarget).toggleClass('expanded');
      }
    });
  });
})();
