import { GooglePodcastIcon, SpotifyIcon, ApplePodcastIcon } from '@/components/Icons/Podcast';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '@/components/Icons/SocialMedia';
import { Link, StaticQuery, graphql } from 'gatsby';
import React from 'react';

interface QProps {
	podcast?: boolean;
	render: (data: { platforms: ISMPlatform[] }) => JSX.Element;
}

interface ISMPlatform {
	name: string;
	url: string;
	icon: JSX.Element;
}
export const FetchSocialPlatformUrls: React.FC<QProps> = ({ render, podcast }) => {
	return (
		<StaticQuery
			query={query}
			render={(data: IFooterData) => {
				const { social_instagram, social_youtube, social_itunes, social_spotify } =
					data.acNodeSetting;
				const platforms =
					podcast !== true
						? [
								{
									url: social_instagram,
									icon: <InstagramIcon />,
									name: 'Instagram'
								},
								{
									url: social_youtube,
									icon: <YoutubeIcon />,
									name: 'Youtube'
								}
						  ]
						: [
								{
									icon: <ApplePodcastIcon customSize={36} className="w-6 h-6" />,
									name: 'Apple Music',
									url: social_itunes
								},
								{
									icon: <SpotifyIcon customSize={36} className="w-6 h-6" />,
									name: 'Spotify',
									url: social_spotify
								},
								{
									icon: <YoutubeIcon customSize={36} className="w-6 h-6" />,
									name: 'Youtube',
									url: social_youtube
								}
						  ];

				return render({ platforms });
			}}
		/>
	);
};

export default FetchSocialPlatformUrls;

const query = graphql`
	query GetSocialMediaPlatforms {
		acNodeSetting {
			social_itunes
			social_youtube
			social_spotify
			social_instagram
		}
	}
`;

interface IFooterData {
	acNodeSetting: {
		social_itunes: string;
		social_youtube: string;
		social_spotify: string;
		social_instagram: string;
	};
}
