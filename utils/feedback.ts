import { Feedback, FeedbackRequest } from '../types/feedback';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const feedbackService = {
  sendFeedback: async (githubId: string, data: FeedbackRequest): Promise<void> => {
    const response = await fetch(`${API_URL}/api/feedback/${githubId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send feedback');
    }
  },

  getUserFeedback: async (githubId: string): Promise<Feedback[]> => {
    const response = await fetch(`${API_URL}/api/feedback/${githubId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch feedback history');
    }

    const data = await response.json();
    return data.feedbacks; 
  }
};