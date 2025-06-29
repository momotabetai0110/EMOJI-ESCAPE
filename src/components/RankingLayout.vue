<template>
    <div class="ranking-screen">
        <h1>ランキング</h1>
        <div class="ranking-inner">
            <div class="ranking-your-content">
                <!-- ユーザーID -->
                <div class="ranking-your-id">
                    <p>あなたのID</p>
                    <p>{{ userID }}</p>
                </div>

                <!-- ユーザーランク -->
                <div class="ranking-your-rank">
                    <p>あなたの順位</p>
                    <p>{{ userRank }}</p>
                    <p>スコア:{{ userScore }}</p>
                </div>

            </div>
            <!-- ランキング -->
            <div class="ranking-list">
                <div class="ranking-card" v-for="rankingScore in rankingScores">
                    ID:{{ rankingScore.session_id }}
                    スコア:{{ rankingScore.ranking_score }}
                    {{ rankingScore.created_time }}
                </div>
            </div>
        </div>

        <!-- モーダル -->
        <BaseModal v-if="isModal" :title=modalTitle>
            <!-- API使用不可 -->
            <div v-if="modalStatus == 0">
                <p>ランキングを使用することができません</p>
            </div>
        </BaseModal>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseModal from './BaseModal.vue'


const canAPI = (false) //APIを使用するかどうか
const rankingScores = ref(null) //ランキング用スコア配列

//モーダル管理
const isModal = ref(false) //モーダルの表示状態　true:表示中,false:非表示
const modalStatus = ref(0) //モーダルの表示内容　0:ランキング使用不可
const modalTitle = ref('') //モーダルのタイトル

//ユーザー情報
const userID = ref(null) //ユーザーID
const userRank = ref(null) //ユーザーランク
const userScore = ref(null) //ユーザースコア





const openModal = (status) => {
    isModal.value = true
    modalStatus.value = status
}

const closeModal = (status) => {
    isModal.value = false
    modalStatus.value = 0
}

onMounted(() => {
    if (canAPI) {
        console.log('APIを使用します')
    }
    else {
        console.log('APIを使用しません')
        //ダミーデータ
        rankingScores.value = [
            {
                "session_id": 1,
                "ranking_score": 1,
                "created_time": "2025-06-25 17:04:00"
            },
            {
                "session_id": 2,
                "ranking_score": 2,
                "created_time": "2025-06-24 17:04:00"
            },
            {
                "session_id": 3,
                "ranking_score": 3,
                "created_time": "2025-05-25 17:04:00"
            },
            {
                "session_id": 4,
                "ranking_score": 2,
                "created_time": "2025-06-25 10:04:00"
            },
            {
                "session_id": 5,
                "ranking_score": 5,
                "created_time": "2025-06-25 17:00:00"
            }
        ]
        userID.value = 1
        userRank.value = 1
        userScore.value = 100

        modalTitle.value = 'ランキングを使用することができません'
        openModal(0)
    }
})
</script>

<style>
.ranking-screen {
    background-color: bisque;
    align-items: center;
    display: flex;
    justify-content: center;
    flex: 1
}
</style>