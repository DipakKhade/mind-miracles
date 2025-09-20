import CertificateComponent from '@/components/certificate';

export default function Page({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <CertificateComponent courseId={params.courseId} />
    </div>
  );
}
