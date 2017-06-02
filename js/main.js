/**
 * @author Olga Chubakova
 *
 */

/** * Load and render mustache template
 * @param {object} data data used to render template
 * @param {string} templatePath path to mustache template file
 * @param {string} templateId id of template script on the page
 * @param {string} targetId id of content element to insert rendered template
 * @param {string} templateName name of mustache template on the page
 */

function renderEpisodesTemplate(dataPaths, templatePath, templateId, targetId, templateName) {
  var currentDataPathIndex = 0;
  renderTemplate(dataPaths[currentDataPathIndex], templatePath, templateId, targetId, templateName);
  $('#showEpisode').click(function() {
    currentDataPathIndex++;
    if (dataPaths.length <= currentDataPathIndex) {
      $('#showEpisode').css("background-color", "white").css("color", "#1E0014").text("The End").css("width", "174px");
      $('.episodeItem__shadow').hide();
      return;
    }
    renderTemplate(dataPaths[currentDataPathIndex], templatePath, templateId, targetId, templateName);
    $('.episodeItem__shadow').attr("id", "shadow");
    $('.episodeItem__shadow').removeAttr("id", "shadow");
    $('div').removeClass('episodeItem__shadow');
  });
}


/** * Load and render mustache template
 * @param {object} dataPath path to json file
 * @param {object} data data used to render template
 * @param {string} templatePath path to mustache template file
 * @param {string} templateId id of template script on the page
 * @param {string} targetId id of content element to insert rendered template
 * @param {string} templateName name of mustache template on the page
 */

function renderTemplate(dataPath, templatePath, templateId, targetId, templateName) {
  $.get(templatePath, function(template) {
    $.getJSON(dataPath, function(data) {
      var navs = $(templateId).html();
      var partial = {};
      partial[templateName] = template;
      var html = Mustache.render(navs, data, partial);
      $(targetId).append(html);
      if (targetId == '#playlistItem' || targetId == '#photo' || targetId == '#cast' || targetId == '#recommend') {
        initializeCarousel(targetId);
      };
      if (targetId == '#photoBlock3') {
        initializeCarousel('#photos');
      };

      /**
       * Initialize carousels on the page
       */
      function initializeCarousel(targetId) {
        $(targetId).owlCarousel({
          navigation: true,
          loop: true,
          margin: 2,
          items: 4,
          center: true,
          autoWidth: true
        });
      }
    });
  });
}

$(function() {
  renderTemplate('blocks/advertising/advertising.json', 'blocks/advertising/advertising.mustache', '#ad-blocks-imgs', '#ads', 'advertising');
  renderTemplate('blocks/header/nav/nav.json', 'blocks/header/nav/nav.mustache', '#navigation', '#nav', 'nav');
  renderTemplate('blocks/playlists/playlists.json', 'blocks/playlists/playlists.mustache', '#playlists', '#playlistItem', 'playlists');
  renderTemplate('blocks/episodes/episodesSections/episodesSections.json', 'blocks/episodes/episodesSections/episodesSections.mustache', '#episodesSections', '#episodeLinks', 'episodesSections');
  var episodes = ['blocks/episodes/episodes/episodes1.json', 'blocks/episodes/episodes/episodes2.json', 'blocks/episodes/episodes/episodes2.json'];
  renderEpisodesTemplate(episodes, 'blocks/episodes/episodes/episodes.mustache', '#episodes', '#viewEpisode', 'episodes');
  renderTemplate('blocks/news/news.json', 'blocks/news/news.mustache', '#newsItems', '#newsItemBig', 'news');
  renderTemplate('blocks/news/newsSmallItems.json', 'blocks/news/newsSmallItems.mustache', '#newsItemsMini', '#newsItemSmall', 'newsSmallItems');
  renderTemplate('blocks/photos/photoBlock1.json', 'blocks/photos/photoBlock1.mustache', '#photos_template1', '#photoBlock1', 'photoBlock1');
  renderTemplate('blocks/photos/photoBlock2.json', 'blocks/photos/photoBlock2.mustache', '#photos_template2', '#photoBlock2', 'photoBlock2');
  renderTemplate('blocks/photos/photoBlock3.json', 'blocks/photos/photoBlock3.mustache', '#photos_template3', '#photoBlock3', 'photoBlock3');
  renderTemplate('blocks/cast/cast.json', 'blocks/cast/cast.mustache', '#cast_template', '#cast', 'cast');
  renderTemplate('blocks/recommendations/recommendations.json', 'blocks/recommendations/recommendations.mustache', '#recommend_template', '#recommend', 'recommendations');
  renderTemplate('blocks/stories/stories.json', 'blocks/stories/stories.mustache', '#storiesItems', '#stories', 'stories');
});
