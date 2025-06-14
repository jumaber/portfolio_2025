export function GAReport() {
  return (
    <div className="w-full aspect-[4/3]">
      <iframe
        className="w-full h-full"
        src="https://lookerstudio.google.com/embed/reporting/642c28cd-a396-4f16-b5f4-c4001416b33c/page/saPNF"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen
        title="Looker Studio Report"
        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      ></iframe>
    </div>
  );
}
