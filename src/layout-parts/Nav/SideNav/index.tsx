import { SideNavItem } from '@/components/Button';
import LanguageDropdown from '@/layout-parts/Nav/Languages';
import SocialPlatformas from '@/layout-parts/Nav/SocialPlatforms';
import { IDrawerNav } from '@/layouts/AppWrapper';
import ac_strings from '@/strings/ac_strings.js';
import menus from '@/strings/generated/menus.json';
import * as React from 'react';

import ResourceMenu from './ResourceMenu';
import SideNavWrapper from './SideNavWrapper';

const { side, sideResource } = menus;

const SideMobile: React.FC<IDrawerNav> = ({ isSideNavOpen, setSideNavOpen }) => {
	const [openResourceMenu, setOpenResourceMenu] = React.useState(false);
	const close = () => {
		setSideNavOpen(false);
	};

	const closeResourceMenu = () => {
		setOpenResourceMenu(false);
		setSideNavOpen(false);
	};

	return (
		<SideNavWrapper close={close} isSideNavOpen={isSideNavOpen} className="flex flex-col justify-between p-4">
			{openResourceMenu && (
				<ResourceMenu
					menu={sideResource}
					isSideNavOpen={openResourceMenu}
					close={closeResourceMenu}
					back={() => setOpenResourceMenu(false)}
				/>
			)}

			<div className="w-full flex justify-center sm:hidden">
				<LanguageDropdown className="border border-ac-slate-dark font-roboto font-semibold text-ac-slate-dark rounded-full pl-4" />
			</div>
			<div className="mx-auto flex flex-col font-roboto items-center font-semibold w-full">
				<SideNavItem
					next
					onClick={() => {
						setOpenResourceMenu(true);
					}}
				>
					{ac_strings.resource}
				</SideNavItem>
				{side.map((item, i) => {
					return (
						<SideNavItem key={i} to={item.to} onClick={close}>
							{item.name}
						</SideNavItem>
					);
				})}
			</div>

			<div className="pt-4 text-ac-slate-dark">
				<SocialPlatformas />
			</div>
		</SideNavWrapper>
	);
};

export default React.memo(SideMobile);
