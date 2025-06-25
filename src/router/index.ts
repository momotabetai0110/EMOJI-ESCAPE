import { createRouter, createWebHistory } from 'vue-router'
import GameLayout from "@/components/GameLayout.vue";
import RankingLayout from "@/components/RankingLayout.vue";

const routes = [
	{
		path: "/",
		name: "game",
		component: GameLayout
	},
	{
		path: "/ranking",
		name: "ranking",
		component: RankingLayout
	}
];

const router = createRouter({
	history: createWebHistory('/EMOJI-ESCAPE/'),
	routes
});

export default router;
