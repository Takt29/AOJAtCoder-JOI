import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <Card className="bg-white/80 dark:bg-slate-800/70 backdrop-blur-md shadow-2xl mb-8 border-0">
        <CardHeader>
          <CardTitle className="text-sky-700 dark:text-sky-400 border-b border-sky-200 dark:border-sky-700 pb-2">検索</CardTitle>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>
      <Card className="bg-white/80 dark:bg-slate-800/70 backdrop-blur-md shadow-2xl mb-8 border-0">
        <CardHeader>
          <CardTitle className="text-teal-700 dark:text-teal-400 border-b border-teal-200 dark:border-teal-700 pb-2">統計</CardTitle>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>
      <Card className="bg-white/80 dark:bg-slate-800/70 backdrop-blur-md shadow-2xl border-0">
        <CardHeader>
          <CardTitle className="text-indigo-700 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-700 pb-2">難易度表</CardTitle>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>
    </>
  );
}
