import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    language: '',
    url: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const token = localStorage.getItem('token');

      const res = await axios.post(
        'https://bookclub-3msp.onrender.com/api/v1/add-book',
        bookData,
        {
          headers: {
            id: localStorage.getItem('id'),
            authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        }
      );

      setSuccess(' Book added successfully!');
      setBookData({
        title: '',
        author: '',
        description: '',
        price: '',
        language: '',
        url: ''
      });
    } catch (err) {
      console.error('Error adding book:', err);
      setError(' Failed to add book. Please check the console or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-zinc-800 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Add a New Book</h2>

      {success && <p className="text-green-400 mb-4">{success}</p>}
      {error && <p className="text-red-400 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="grid gap-6">
        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
            placeholder="Enter book title"
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white placeholder-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block font-semibold mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
            placeholder="Author name"
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white placeholder-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={bookData.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Enter book description"
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white placeholder-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* Price & Language */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={bookData.price}
              onChange={handleChange}
              required
              placeholder="e.g. 499"
              className="w-full px-4 py-2 rounded bg-zinc-700 text-white placeholder-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Language</label>
            <input
              type="text"
              name="language"
              value={bookData.language}
              onChange={handleChange}
              required
              placeholder="e.g. English, Hindi"
              className="w-full px-4 py-2 rounded bg-zinc-700 text-white placeholder-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-semibold mb-1">Image URL</label>
          <input
            type="text"
            name="url"
            value={bookData.url}
            onChange={handleChange}
            required
            placeholder="Paste image URL"
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white placeholder-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Image Preview */}
        {bookData.url && (
          <div className="mt-2">
            <p className="text-sm text-gray-300 mb-1">Image Preview:</p>
            <img
              src={bookData.url}
              alt="Book"
              className="w-32 h-40 object-cover border border-gray-400 rounded"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all text-lg"
        >
          {loading ? 'Submitting...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
