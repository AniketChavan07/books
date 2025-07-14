import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    language: '',
    url: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/v1/get-book-id/${id}`);
        setBookData(res.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load book data');
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      await axios.put(
        `https://bookclub-3msp.onrender.com/api/v1/update-book`,
        bookData,
        {
          headers: {
            bookid: id,
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccess('Book updated successfully!');
      setTimeout(() => navigate('/allbooks'), 1500);
    } catch (err) {
      setError('Failed to update book');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 py-10 px-4 text-white">
      <div className="max-w-3xl mx-auto bg-zinc-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Update Book</h2>

        {success && <p className="text-green-400 mb-4">{success}</p>}
        {error && <p className="text-red-400 mb-4">{error}</p>}

        <form onSubmit={handleUpdate} className="grid gap-6">
          {[
            { name: 'title', placeholder: 'Title' },
            { name: 'author', placeholder: 'Author' },
            { name: 'description', placeholder: 'Description', isTextArea: true },
            { name: 'price', placeholder: 'Price', type: 'number' },
            { name: 'language', placeholder: 'Language' },
            { name: 'url', placeholder: 'Image URL' },
          ].map(({ name, placeholder, isTextArea, type = 'text' }) =>
            isTextArea ? (
              <textarea
                key={name}
                name={name}
                value={bookData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                rows={4}
                className="w-full px-4 py-2 rounded bg-zinc-700 text-white placeholder-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <input
                key={name}
                type={type}
                name={name}
                value={bookData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 rounded bg-zinc-700 text-white placeholder-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
