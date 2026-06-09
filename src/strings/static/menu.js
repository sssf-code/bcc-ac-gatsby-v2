const slug_user = 'user';
const ac_strings = require('../ac_strings');
module.exports.slug_user = slug_user;
module.exports.menusItems = {
	home: {
		name: ac_strings.home,
		to: '/'
	},
	listen: {
		name: ac_strings.listen,
		to: ac_strings.slug_listen
	},
	explore: {
		name: ac_strings.explore,
		to: ac_strings.slug_explore
	},
	read: {
		name: ac_strings.read,
		to: ac_strings.slug_read
	},
	watch: {
		name: ac_strings.watch,
		to: ac_strings.slug_watch
	},
	about: {
		name: ac_strings.about,
		to: ac_strings.slug_about
	},
	contact: {
		name: ac_strings.contact,
		to: ac_strings.slug_contact
	},
	glossary: {
		name: ac_strings.glossary,
		to: ac_strings.slug_glossary
	},
	topic: {
		name: ac_strings.topics,
		to: ac_strings.slug_topic
	},
	podcast: {
		name: ac_strings.podcast,
		to: `${ac_strings.slug_podcast}/${ac_strings.slug_latest}`
	},
	scripture: {
		name: ac_strings.scripture,
		to: `${ac_strings.slug_scripture}`
	}
};

module.exports.userMenuItems = {
	bookmarked: {
		name: ac_strings.bookmarked,
		to: `${slug_user}/${ac_strings.slug_user_bookmarked}`
	},
	history: {
		name: ac_strings.history,
		to: `${slug_user}/${ac_strings.slug_user_history}`
	},
	followed: {
		name: ac_strings.followed,
		to: `${slug_user}/${ac_strings.slug_user_followed}`
	},
	changePassword: {
		name: ac_strings.change_password,
		to: `${slug_user}/${ac_strings.slug_user_change_password}`
	},
	deleteProfile: {
		name: ac_strings.delete_profile,
		to: `${slug_user}/${ac_strings.slug_user_delete_profile}`
	},
	myContent: {
		name: ac_strings.my_content,
		to: `${slug_user}/${ac_strings.slug_user_content}`
	}
};
