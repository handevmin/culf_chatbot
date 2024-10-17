const API_URL = 'https://culf-test-bot-53526c2de9f6.herokuapp.com';

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/upload-image`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Image upload failed');
  }

  return response.json();
}

export async function sendQuestion(question, imageData, chatId) {
  const response = await fetch(`${API_URL}/ask-question`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      question, 
      image_data: imageData, 
      chat_id: chatId 
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send question');
  }

  return response.json();
}

export async function getChatHistory(chatId) {
  const response = await fetch(`${API_URL}/chats/${chatId}`);

  if (!response.ok) {
    throw new Error('Failed to get chat history');
  }

  return response.json();
}

export async function getChats() {
  const response = await fetch(`${API_URL}/chats`);

  if (!response.ok) {
    throw new Error('Failed to get chats');
  }

  return response.json();
}

export async function createChat() {
  const response = await fetch(`${API_URL}/chats`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to create new chat');
  }

  return response.json();
}

export async function deleteChat(chatId) {
  const response = await fetch(`${API_URL}/chats/${chatId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete chat');
  }

  return response.json();
}