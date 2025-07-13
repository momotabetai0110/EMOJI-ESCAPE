<template>
    <div class="ranking-screen">
        <div class="ranking-header">
            <h1>ランキング</h1>
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
                <div class="ranking-card" v-for="(rankingScore, index) in rankingScores">
                    {{ index + 1 }}位
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
            },{
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
    padding: 20px;
    font-family: Arial, sans-serif;
    font-weight: normal ;
    font-size: 20px;
}

.ranking-inner {
    align-items: center;
    justify-content: center;
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
    padding: 5px;
}


</style>