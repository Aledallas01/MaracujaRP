// Simple fetch-based API client
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Types
export interface RuleSection {
  id: string;
  title: string;
  description?: string;
  icon: string;
  orderIndex: number;
  rules: Rule[];
}

export interface Rule {
  id: string;
  title: string;
  content: string;
  orderIndex: number;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

// Helper function for API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_URL}${endpoint}`;
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Rules API
export const rulesAPI = {
  getSections: () => apiCall('/rules/sections'),
  
  createRule: (data: { sectionId: string; title: string; content: string; orderIndex?: number }) =>
    apiCall('/rules/rules', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  updateRule: (id: string, data: { title: string; content: string; orderIndex?: number; sectionId?: string }) =>
    apiCall(`/rules/rules/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  deleteRule: (id: string) =>
    apiCall(`/rules/rules/${id}`, {
      method: 'DELETE',
    }),
};

// Admin API
export const adminAPI = {
  getStats: () => apiCall('/admin/stats'),
};

export default { rulesAPI, adminAPI };