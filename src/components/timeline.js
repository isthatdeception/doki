import Skeleton from "react-loading-skeleton";
import { usePhotos } from "../utils/usePhotos";
import Post from "./post/main";

export default function Timeline() {
  const { photos } = usePhotos();
  /**
   * we need to get photos of the loggedinuser
   * on loading photos we need to use react-loading-skeleton
   * if we have photos, render them as a post component
   *
   * if the user has no photos, tell them to create some photos or explore
   */
  return (
    <div className="container col-span-2">
      {!photos ? (
        <>
          {[...new Array(4)].map((_, index) => (
            <Skeleton
              key={index}
              count={4}
              width={640}
              height={580}
              className="mb-4"
            />
          ))}
        </>
      ) : photos.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-2xl text-center">
          follow some users to see their posts
        </p>
      )}
    </div>
  );
}
