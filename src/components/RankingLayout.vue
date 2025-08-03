<template>
    <div class="ranking-screen">
        <div class="ranking-header">
            <h2>ランキング</h2>
        </div>
        <div class="ranking-inner">
            <div class="ranking-your-content-wrapper">
                <div class="ranking-your-content">
                    <div class="user-id">あなたのID:{{ userID }}</div>
                    <div class="user-rank">あなたの順位:{{ userRank }}位</div>
                </div>
                <div class="ranking-your-score">
                    <div>スコア:{{ userScore }}</div>
                </div>
            </div>
            <!-- ランキング -->
            <div class="ranking-list">
                <table class="ranking-table">
                    <thead class="sticky-header">
                        <tr>
                            <th>順位</th>
                            <th>ID</th>
                            <th>スコア</th>
                            <th>日時</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class=" ranking-card" v-for="(rankingScore, index) in rankingScores">
                            <td>{{ index + 1 }}位</td>
                            <td>{{ rankingScore.session_id }}</td>
                            <td>{{ rankingScore.ranking_score }}</td>
                            <td>{{ rankingScore.created_time }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- モーダル -->
        <BaseModal v-if="isModal" :title=modalTitle>
            <!-- API使用不可 -->
            <div v-if="modalStatus == 0">
                <p>ランキングを使用することができません</p>
            </div>
        </BaseModal>
        <!-- ローディングモーダル -->
        <LoadingModal v-model="isLoading" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseModal from './BaseModal.vue'
import LoadingModal from './LoadingModal.vue'
import { emojiApi } from '../api/emojiApi'
import { useCookieFunction } from '../composables/useCookies.js'

const isConnect = ref(false) // 0:接続失敗,1:接続成功
const rankingScores = ref(null) //ランキング用スコア配列

//モーダル管理
const isModal = ref(false) //モーダルの表示状態　true:表示中,false:非表示
const modalStatus = ref(0) //モーダルの表示内容　0:ランキング使用不可
const modalTitle = ref('') //モーダルのタイトル
const isLoading = ref(false) //0:通常　1:ロード中

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

onMounted(async () => {

    // //接続確認用APIの呼び出し
    // isLoading.value = true
    // isConnect.value = await emojiApi.getTestData()
    // isLoading.value = false

    if (isConnect.value) {
        console.log('APIを使用します')
    }
    else {
        console.log('APIを使用しません')
        //ダミーデータ
        rankingScores.value = [
            {
                "session_id": 123456,
                "ranking_score": 1000,
                "created_time": "2025-06-25 17:04:00"
            },
            {
                "session_id": 234567,
                "ranking_score": 900,
                "created_time": "2025-06-24 17:04:00"
            },
            {
                "session_id": 345678,
                "ranking_score": 800,
                "created_time": "2025-05-25 17:04:00"
            },
            {
                "session_id": 456789,
                "ranking_score": 700,
                "created_time": "2025-06-25 10:04:00"
            },
            {
                "session_id": 567890,
                "ranking_score": 600,
                "created_time": "2025-06-25 17:00:00"
            },
            {
                "session_id": 567890,
                "ranking_score": 600,
                "created_time": "2025-06-25 17:00:00"
            },
            {
                "session_id": 567890,
                "ranking_score": 600,
                "created_time": "2025-06-25 17:00:00"
            },
            {
                "session_id": 567890,
                "ranking_score": 600,
                "created_time": "2025-06-25 17:00:00"
            },
            {
                "session_id": 567890,
                "ranking_score": 600,
                "created_time": "2025-06-25 17:00:00"
            },
            {
                "session_id": 567890,
                "ranking_score": 600,
                "created_time": "2025-06-25 17:00:00"
            },
            {
                "session_id": 567890,
                "ranking_score": 600,
                "created_time": "2025-06-25 17:00:00"
            },
            {
                "session_id": 567890,
                "ranking_score": 600,
                "created_time": "2025-06-25 17:00:00"
            },
            {
                "session_id": 843522,
                "ranking_score": 600,
                "created_time": "2025-06-25 17:00:00"
            }, {
                "session_id": 567890,
                "ranking_score": 600,
                "created_time": "2025-06-25 17:00:00"
            }
        ]
        userID.value = 843522
        userRank.value = 1
        userScore.value = 100

        modalTitle.value = 'ランキングを使用することができません'
        openModal(0)
    }
})
</script>

<style>
.ranking-screen {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(241, 246, 216);
    font-family: Arial, sans-serif;
    font-weight: normal;
    font-size: 20px;

}

.ranking-inner {
    align-items: center;
    justify-content: center;
    width: 85%;
}

.ranking-your-content-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px;
    background-color: rgb(231, 242, 251);
}

.user-id {
    font-size: 15px;
}

.user-rank {
    font-size: 15px;
}

.ranking-your-score {
    padding-left: 50px;
}

.ranking-list {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    padding: 10px;
    border-radius: 10px;
    background-color: rgb(231, 242, 251);
    font-size: 15px;
    height: 500px;
    overflow-y: auto;

}

.ranking-card {
    border-bottom: 1px solid rgb(76, 76, 77);
    padding: 20px;
}

.ranking-table {
    width: 100%;
    border-spacing: 0;
    table-layout: auto;
    padding: 10px;
}
.sticky-header {
    position: sticky;
    background-color: rgb(231, 242, 251);
    top: 0;
    z-index: 10;
}

.ranking-table th {
    text-align: center;
}

.ranking-table td {
    text-align: center;
    padding-top: 10px;
    border-bottom: 1px solid rgb(41, 41, 41);
}
</style>