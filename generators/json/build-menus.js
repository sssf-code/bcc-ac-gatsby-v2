const { sendQuery } = require('gatsby-source-ac/helpers');
const endpoints = require('../../src/strings/static/endpoints');
const { saveFile } = require('./build-translated-strings');

const getMenus = () => {
	const { menusItems } = require('../../src/strings/static/menu');
	const menus = {};

	const desktopMenuOptions = {
		all: ['read', 'listen', 'watch', 'explore'],
		podcast_only: ['read', 'podcast', 'watch', 'explore'],
		other: ['read', 'watch', 'explore', 'about']
	};
	const mobileMenuOptions = {
		all: ['explore', 'read', 'listen', 'watch'],
		podcast_only: ['read', 'podcast', 'watch', 'explore'],
		other: ['explore', 'read', 'watch', 'topic']
	};

	const listenSectionKey = process.env.LISTEN_SECTION;

	const getDesktopMenu = () => {
		const menu =
			listenSectionKey && desktopMenuOptions[listenSectionKey]
				? desktopMenuOptions[listenSectionKey]
				: desktopMenuOptions.other;
		const items = menu.map(item => menusItems[item]);
		menus['desktop'] = items;
	};

	const getMobileMenu = () => {
		const menu =
			listenSectionKey && mobileMenuOptions[listenSectionKey]
				? mobileMenuOptions[listenSectionKey]
				: mobileMenuOptions.other;
		const items = [...menu].map(item => ({ ...menusItems[item], iconName: iconNameMapNav[item] }));
		menus['mobile'] = {
			loggedIn: ['home', ...menu].map(item => ({ ...menusItems[item], iconName: iconNameMapNav[item] })),
			default: ['home', ...menu].map(item => ({ ...menusItems[item], iconName: iconNameMapNav[item] }))
		};
		return items;
	};

	const getSideMenu = () => {
		const items = ['about', 'contact'].map(item => menusItems[item]);
		menus['side'] = items;
	};

	const getSideResourceMenu = () => {
		const sideResourceMenu =
			listenSectionKey && mobileMenuOptions[listenSectionKey]
				? mobileMenuOptions[listenSectionKey]
				: mobileMenuOptions.other;

		if (process.env.GLOSSARY === 'true') {
			sideResourceMenu.push(menusItems.glossary);
		}

		const items = sideResourceMenu.map(item => menusItems[item]);
		menus['sideResource'] = items;
	};
	getDesktopMenu();
	getMobileMenu();
	getSideMenu();
	getSideResourceMenu();
	return menus;
};

const languageSites = async function () {
	const { menusItems, userMenuItems, slug_user } = require('../../src/strings/static/menu');
	const query = `
    {
      sites {
        lang
        locale
        title
        url
      }
      settings {
        key
        value
      }
    }
  `;
	const menus = getMenus();

	return sendQuery(query, endpoints.api_url, { 'x-lang': process.env.LANG_CODE }).then(res => {
		const { sites, settings } = res;
		const metadata = {};
		settings.forEach(s => {
			metadata[s.key] = s.value;
		});

		const { social_facebook, social_instagram, social_youtube, social_rss, social_itunes, social_spotify } =
			metadata;
		menus['languages'] = sites
			? sites.map(item => ({
					name: item.lang,
					to: item.url,
					locale: item.locale
			  }))
			: [];
		menus['menusItems'] = menusItems;
		menus['userMenuItems'] = userMenuItems;
		menus['slugUser'] = slug_user;
		menus['topLink'] = metadata['top_link'];
		menus['socialLinks'] = {
			social_facebook,
			social_instagram,
			social_youtube,
			social_rss,
			social_itunes,
			social_spotify
		};
		saveFile('./src/strings/generated', 'menus', 'json', menus);
	});
};

module.exports.languageSites = languageSites;

const iconNameMapNav = {
	home: 'HomeIcon',
	explore: 'ExploreIcon',
	listen: 'HeadsetIcon',
	podcast: 'HeadsetIcon',
	read: 'DescriptionIcon',
	watch: 'PlayCircleOutlineIcon',
	topic: 'LocalOfferIcon'
};
