export interface Feedback {
  _id?: string;
  userId: string;
  userEmail: string;
  message: string;
  createdAt?: string;
}

export interface FeedbackRequest {
  message: string;
}