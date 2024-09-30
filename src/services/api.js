const API_URL = 'https://math-chatbot-bbebf43b55ca.herokuapp.com';

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

export async function sendQuestion(question, imageData) {
  const response = await fetch(`${API_URL}/ask-question`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question, image_data: imageData }),
  });

  if (!response.ok) {
    throw new Error('Failed to send question');
  }

  return response.json();
}