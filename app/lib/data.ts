
import axios from 'axios';
import { Subscription, Transaction } from './definitions';



export async function getFunds() {
  try {
    const response = await axios.get('https://8x7jb39mo8.execute-api.us-east-1.amazonaws.com/Prod/resource?resource_type=funds', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data
  } catch (error) {
    console.error('Error fetching funds:', error);
    throw new Error('Failed to fetch data.');
  }
}

export async function getClients() {
  try {
    const response = await axios.get('https://8x7jb39mo8.execute-api.us-east-1.amazonaws.com/Prod/resource?resource_type=clients', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data
  } catch (error) {
    console.error('Error fetching funds:', error);
    throw new Error('Failed to fetch data.');
  }
}


export async function sendSubscription (fundId: string, userId: string, amount: number) {
  try {
    const response = await axios.post(
      "https://8x7jb39mo8.execute-api.us-east-1.amazonaws.com/Prod/funds/subscribe", 
      {
        userId: userId,        
        fundId: fundId,     
        amount: amount.toString() 
      }, 
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error saving transaction:", error);
    throw new Error("Failed to post data.");
  }
};

export async function cancelSubscription (fundId: string, userId: string) {
  try {
    console.log(userId)
    const response = await axios.post(
      "https://8x7jb39mo8.execute-api.us-east-1.amazonaws.com/Prod/funds/cancel", 
      {
        userId: userId,      
        fundId: fundId,        
      }, 
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error saving transaction:", error);
    throw new Error("Failed to post data.");
  }
};



export  async function getSubscriptions(userId: string) {

  try {
    const response = await axios.get(
      `https://8x7jb39mo8.execute-api.us-east-1.amazonaws.com/Prod/funds/suscription/${userId}`, 
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data
  } catch (error) {
    console.error("Error getting transaction:", error);
    throw new Error("Failed to get data.");
  }
}

export async function getHistorical(userId: string) {

  try {
    const response = await axios.get(
      `https://8x7jb39mo8.execute-api.us-east-1.amazonaws.com/Prod/funds/history/${userId}`, 
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data
  } catch (error) {
    console.error("Error getting transaction:", error);
    throw new Error("Failed to get data.");
  }
}
