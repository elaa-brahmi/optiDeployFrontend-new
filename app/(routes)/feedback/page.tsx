'use client';
import React, { useState, useEffect } from 'react';
import { feedbackService } from '../../../utils/feedback';
import { Feedback } from '../../../types/feedback';
import { useSession } from 'next-auth/react'; 
import { toast } from 'sonner';

const FeedbackPage = () => {
  const { data: session } = useSession();
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);

  const githubId = session?.user?.id; 
  console.log("GitHub ID from session:", githubId);

  useEffect(() => {
    if (githubId) {
      loadHistory();
    }
  }, [githubId]);

  const loadHistory = async () => {
    try {
      const data = await feedbackService.getUserFeedback(githubId!);
      setHistory(data);
    } catch (err) {
      console.error("Failed to load feedback history");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!message.trim() || !githubId) return;

  setLoading(true);

  toast.promise(feedbackService.sendFeedback(githubId, { message }), {
    loading: 'Sending your insight to the team...',
    success: () => {
      setMessage('');
      loadHistory(); 
      return "Insight received! Thanks for helping us ameliorate optiDeploy.";
    },
    error: "Failed to send feedback. Please try again.",
  });

  setLoading(false);
};

  return (
    <div className="max-w-4xl mx-auto p-6 my-20 text-white bg-slate-900 rounded-xl">
      <h1 className="text-2xl font-bold mb-2">Help us ameliorate optiDeploy </h1>
      <p className="text-slate-400 mb-6">Share your insights, suggest features, or report bugs.</p>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <textarea
          className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          rows={5}
          placeholder="How can we make the copilot better for your workflow?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-all disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Feedback'}
        </button>
      </form>

      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-slate-800 pb-2">Your Feedback History</h2>
        <div className="space-y-3">
          {history.length === 0 ? (
            <p className="text-slate-500 italic">No feedback sent yet.</p>
          ) : (
            history.map((item) => (
              <div key={item._id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-800">
                <p className="text-sm">{item.message}</p>
                <span className="text-xs text-slate-500 mt-2 block">
                  {new Date(item.createdAt!).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default FeedbackPage;