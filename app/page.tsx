import { ImageStoreProvider, useImageStore } from '@/lib/image-store';
import Editor from '@/components/Editor';

export default function Home() {
  return (
    <ImageStoreProvider initialValue={{ activeColor: 'ss', activeImage: 'dd', activeTag: 'dd' }}>
      <Editor />
    </ImageStoreProvider>
  );
}
