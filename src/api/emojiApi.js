// src/api/に配置
import api from './index'

export const emojiApi = {
//テスト用API
    getTestData: async()=>{
        try{
        return await api.get('/test')
        }catch(error){
            console.error('テストデータ取得エラー:', error)
            throw error
        }
    },
    //クライアントID作成
    getClientIds: async() => {
        try{
        return await api.post('/clientIds')
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
    postRanking: async(clientId, score)=>{
        try{
        return await api.post('/rankings',{clientId:clientId,gameScore:score})
        }catch(error){
            console.error('ランキング更新エラー:', error)
            throw error
        }
    }
}