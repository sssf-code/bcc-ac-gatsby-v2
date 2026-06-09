/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const _ = require('lodash');
const { getIndexPostQuery, allPostQueries } = require('gatsby-source-ac/helpers');
const buildTranslatedStrings = require('./generators/json/build-translated-strings');
const { onPostBuildTest } = require('./generators/postBuildTests');
const buildMenus = require('./generators/json/build-menus');
const generateLogo = require('./generators/Other/generateLogo');
const { fetchScripts } = require('./fetch-external-scripts.js');
const endpoints = require('./src/strings/static/endpoints');
exports.onCreateWebpackConfig = ({ actions, plugins }) => {
	actions.setWebpackConfig({
		plugins: [
			plugins.define({
				'process.env.SITE_URL': JSON.stringify(process.env.SITE_URL),
				'process.env.LANG': JSON.stringify(process.env.LANG),
				'process.env.LANG_CODE': JSON.stringify(process.env.LANG_CODE),
				'process.env.LOCALE': JSON.stringify(process.env.LOCALE),
				'process.env.ALGOLIA_APP_ID': JSON.stringify(process.env.ALGOLIA_APP_ID),
				'process.env.ALGOLIA_SEARCH_KEY': JSON.stringify(process.env.ALGOLIA_SEARCH_KEY),
				'process.env.BRANCH': JSON.stringify(String(process.env.BRANCH).substr(0, 6)),
				'process.env.LISTEN_SECTION': JSON.stringify(process.env.LISTEN_SECTION),
				'process.env.GLOSSARY_SECTION': JSON.stringify(process.env.GLOSSARY_SECTION),
				'process.env.SCRIPTURE_SECTION': JSON.stringify(process.env.SCRIPTURE_SECTION),
				'process.env.GA_ID': JSON.stringify(process.env.GA_ID),
				'process.env.CLICKY_ID': JSON.stringify(process.env.CLICKY_ID),
				'process.env.DONT_ADD_TRACKING_CODE': JSON.stringify(process.env.DONT_ADD_TRACKING_CODE),
				'process.env.CONTACT_FROM_TO': JSON.stringify(process.env.CONTACT_FROM_TO)
			})
		],
		node: {
			fs: 'empty'
		}
	});
};

exports.onPreInit = async () => {
	fetchScripts();
	await getIndexPostQuery(endpoints.api_url);
	await buildTranslatedStrings.translationStrings();
	await buildMenus.languageSites();
	await generateLogo();
};

exports.createPages = ({ page, actions, graphql }) => {
	const generatePosts = require('./generators/generatePosts.js');
	const generatePages = require('./generators/generatePages.js');
	const generateAuthors = require('./generators/generateAuthors.js');
	const generateTopics = require('./generators/TopicsFormatsTypes/index.js');
	const generateHome = require('./generators/generateHome.js');
	const generateExplore = require('./generators/generateExplore');
	const generatePodcast = require('./generators/generatePodcast');
	const generateRedirect = require('./generators/generateRedirect');
	const generateSeries = require('./generators/generateSeries');
	const generatePlaylists = require('./generators/generatePlaylists');
	const generateGlossary = require('./generators/generateGlossary');
	const generateScriptures = require('./generators/generateScriptures');
	const generateWallpapers = require('./generators/generateQuoteWallpapers');
	const generators = [
		generateHome(actions, graphql),
		generateExplore(actions, graphql),
		generatePosts(actions, graphql),
		generatePages(actions, graphql)
	];
	generators.push(generatePlaylists(actions, graphql));

	if (process.env.SUPER_SLIM_DEV_MODE !== 'true') {
		generators.push(
			generateAuthors(actions, graphql),

			generateTopics(actions, graphql),
			generateRedirect(actions, graphql),
			generateSeries(actions, graphql)
		);

		if (process.env.LISTEN_SECTION === 'all' || process.env.LISTEN_SECTION === 'podcast_only') {
			console.log('generate podcast');
			generators.push(generatePodcast(actions, graphql));
		}

		if (process.env.LISTEN_SECTION === 'all') {
			console.log('generating playlist');
			generators.push(generatePlaylists(actions, graphql));
		}

		if (process.env.GLOSSARY_SECTION === 'true') {
			console.log('generating glossary');
			generators.push(generateGlossary(actions, graphql));
		}

		if (process.env.SCRIPTURE_SECTION === 'true') {
			console.log('generating scriptures');
			generators.push(generateScriptures(actions, graphql));
		}

		if (process.env.WALLPAPER_SECTION === 'true') {
			generators.push(generateWallpapers(actions, graphql));
		}
	}

	return Promise.all(generators);
};

/* 
exports.onCreateWebpackConfig = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        'react-dom$': 'react-dom/profiling',
        'scheduler/tracing': 'scheduler/tracing-profiling',
      }
    }
  })
} */

exports.onPostBuild = onPostBuildTest;
