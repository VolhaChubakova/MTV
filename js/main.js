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

function renderTemplate(data, templatePath, templateId, targetId, templateName) {
  $.get(templatePath, function(template) {
    var navs = $(templateId).html();
    var partial = {};
    partial[templateName] = template;
    var html = Mustache.render(navs, data, partial);
    $(targetId).html(html);
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
}

$(function() {
  $.getJSON('data.json', function(data) {
    renderTemplate(data, 'blocks/header/nav/nav.mustache', '#navigation', '#nav', 'nav');
    renderTemplate(data, 'blocks/playlists/playlists.mustache', '#playlists', '#playlistItem', 'playlists');
    renderTemplate(data, 'blocks/advertising/advertising.mustache', '#ad-blocks-imgs', '#ads', 'advertising');
    renderTemplate(data, 'blocks/episodes/episodesSections/episodesSections.mustache', '#episodesSections', '#episodeLinks', 'episodesSections');
    renderTemplate(data, 'blocks/episodes/episodes/episodes.mustache', '#episodes', '#viewEpisode', 'episodes');
    renderTemplate(data, 'blocks/news/news.mustache', '#newsItems', '#newsItemBig', 'news');
    renderTemplate(data, 'blocks/news/newsSmallItems.mustache', '#newsItemsMini', '#newsItemSmall', 'newsSmallItems');
    renderTemplate(data, 'blocks/photos/photoBlock1.mustache', '#photos_template1', '#photoBlock1', 'photoBlock1');
    renderTemplate(data, 'blocks/photos/photoBlock2.mustache', '#photos_template2', '#photoBlock2', 'photoBlock2');
    renderTemplate(data, 'blocks/photos/photoBlock3.mustache', '#photos_template3', '#photoBlock3', 'photoBlock3');
    renderTemplate(data, 'blocks/cast/cast.mustache', '#cast_template', '#cast', 'cast');
    renderTemplate(data, 'blocks/recommendations/recommendations.mustache', '#recommend_template', '#recommend', 'recommendations');
    renderTemplate(data, 'blocks/stories/stories.mustache', '#storiesItems', '#stories', 'stories');
  })
});
