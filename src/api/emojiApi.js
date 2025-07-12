// src/api/に配置
import api from './index'

export const emojiApi = {
//接続確認用API
    getTestData: async()=>{
        try{
            await api.get('/connect')
            return 1
        }catch(error){
            return 0
        }
    },
    //クライアントID作成
    getClientId: async() => {
        try{
        return await api.post('/clientId')
        }catch(error){
            console.error('クライアントID取得エラー:', error)
            throw error
        }
    },
    //ランキング取得
    getRankings: async()=>{
        try{
        return await api.get('/rankings')
        }catch(error){
            console.error('ランキング取得エラー:', error)
            return []
        }
    },
    //ランキング更新
    postRanking: async(clientId, score, clearTime, date)=>{
        try{
        return await api.post('/rankings',{
            clientId: clientId,
            clearScore: score,
            clearTime: clearTime,
            date: date
        })
        }catch(error){
            console.error('ランキング更新エラー:', error)
            throw error
        }
    }
}