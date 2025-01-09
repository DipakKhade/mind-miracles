// https://www.youtube.com/watch?v=v0cTo4eGAOM
export const VideoPreview = ({ videolink }: { videolink: string }) => {
  return (
    <>
      <section className="py-16 px-4 bg-green-700">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Program Preview
          </h2>
          <div className="aspect-video bg-black/10 rounded-lg overflow-hidden">
            {/* <iframe
                width="100%"
                height="100%"
                src={videolink}
                title="Program Preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-0"
              /> */}
            <iframe
              width="100%"
              height="100%"
              src={videolink}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};
