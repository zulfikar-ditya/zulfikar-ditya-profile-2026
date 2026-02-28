"use client";

import ProfileCard from "@/components/react-bits/ProfileCard/ProfileCard";

export default function HeroProfileCard() {
	return (
		<ProfileCard
			name="Zulfikar Ditya"
			title="Backend Developer"
			handle="zulfikar-ditya"
			status="Open to work"
			contactText="Hire me"
			avatarUrl="/octocat.png"
			iconUrl="/octocat.png"
			showUserInfo={true}
			showBehindGradient={true}
			enableTilt={true}
			onContactClick={() => {
				window.location.href = "mailto:zulfikarditya.work@gmail.com";
			}}
			behindGradient="radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(77,100%,50%,var(--card-opacity)) 4%,hsla(77,50%,40%,calc(var(--card-opacity)*0.5)) 50%,hsla(0,0%,0%,0) 100%),radial-gradient(35% 52% at 55% 20%,#c4ff0066 0%,#00000000 100%),radial-gradient(100% 100% at 50% 50%,#00bba766 1%,#00000000 76%),conic-gradient(from 124deg at 50% 50%,#c4ff00ff 0%,#00bba7ff 40%,#e12afbff 60%,#c4ff00ff 100%)"
		/>
	);
}
