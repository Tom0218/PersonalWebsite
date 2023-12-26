//匯入預設管理工具
import {defineStore} from 'pinia';
//需輸入兩個參數，1.自建資料庫名稱，2.資料庫內容
export default defineStore ('QuestionnaireFn', {
    
    //data
    state: () =>({

    }),

    //computed
    getters: {

    },

    //methods
    actions: {
        //搜尋問卷
        async searchAllQn({ title, startDate, endDate }) {
            const url = 'http://localhost:8081/api/quiz/search';
            const queryParams = new URLSearchParams({
                title: title,
                start_date: startDate,
                end_date: endDate,
                });
            const urlWithParams = `${url}?${queryParams}`;
    
            try {
            const response = await fetch(urlWithParams, {
                method: 'GET',
                headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
                })
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
    
            // 使用 mutations 來更新狀態
            this.allQn = data;
            } catch (error) {
                console.error('Error:', error);
            }
        },
    }
    
})