import CreatePost from '@/components/CreatePost';
import PostList from '@/components/PostList';
import Image from 'next/image';

export default function Home() {
      return (
            <div className="p-5">
                  <CreatePost />
                  <PostList />
            </div>
      );
}
