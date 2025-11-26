
import Image from 'next/image';
import { News } from '@/types';

interface Props {
  news: News;
  onEdit: () => void;
  onDelete: () => void;
}

export default function AdminNewsCard({ news, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 hover:shadow-xl transition-shadow">
      <div className="flex">
        <div className="w-40 h-40 flex-shrink-0">
          <Image
            src={news.image || '/placeholder-news.jpg'}
            alt={news.title}
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-8 flex justify-between">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold text-teal-800 mb-2">{news.title}</h3>
            <p className="text-sm text-teal-600 font-medium mb-3">{news.date}</p>
            <p className="text-gray-700 leading-relaxed">{news.content}</p>
          </div>
          <div className="flex gap-4 items-start">
            <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button onClick={onDelete} className="text-red-600 hover:text-red-800">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 7l-.867 12.142A2.175 2.175 0 0116.138 21H7.862a2.175 2.175 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}