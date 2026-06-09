import LazyLoad from '@/components/LazyLoad';
import ExclusiveContent from '@/layout-parts/Banner/ExclusiveContent copy';
import NewsLetter from '@/layout-parts/Banner/NewsLetter';
import TopDesktop from '@/layout-parts/Nav/TopDesktop';
import CookieConsent from '@/layouts/AppWrapper/CookeConsent';
import Infobar from '@/layouts/AppWrapper/Infobar';
import menus from '@/strings/generated/menus.json';
import loadable from '@loadable/component';
import { LazyMotion, domAnimation } from 'framer-motion';
import React, { Profiler } from 'react';
import shortid from 'shortid';

import Breadcrumb from './Breadcrumb';
import './Layout.css';

const Footer = loadable(() => import('@/layout-parts/Footer'));

const MediaPlayerNew = loadable(() => import('@/components/MediaPlayerNew/GlobalAudioPlayer'));

const { menusItems } = menus;

export interface IDrawerNav {
	isSideNavOpen: boolean;
	setSideNavOpen: (status: boolean) => void;
}

const App: React.FC<{ pageContext: { title?: string; slug?: string } }> = props => {
	const { children } = props;

	return (
		<LazyMotion features={domAnimation}>
			<Infobar key={shortid()} showDuration={7000} />
			<CookieConsent key={shortid()} />
			{/* <MediaPlayer key={shortid()} /> */}
			<MediaPlayerNew key={shortid()} />
			<TopDesktop key={shortid()} explorePage={menusItems.explore} />

			<div className="relative layout-children" key={shortid()}>
				<Breadcrumb key={shortid()} />
				{children}
			</div>

			<LazyLoad>
				<NewsLetter />
				{/*                 <ExclusiveContent /> */}
				<Footer />
			</LazyLoad>
		</LazyMotion>
	);
};

export default App;
