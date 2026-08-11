"use client";

import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { RequireRole } from "../../../../lib/require-role";
import { useSession } from "../../../../lib/session";
import { useDataStore } from "../../../../lib/data-store";
import { AppTopBar } from "../../../../components/ui";

function MensajesContent() {
  const { session } = useSession();
  const { messages } = useDataStore();
  const myMessages = messages.filter((m) => m.to === session.vendorId);

  return (
    <div className="min-h-screen">
      <AppTopBar title="Mensajes" />
      <div className="max-w-md mx-auto px-5 py-6">
        <Link href="/portal" className="flex items-center gap-1.5 text-sm text-slate-400 mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Menú principal
        </Link>

        <div className="space-y-2.5">
          {myMessages.map((m) => (
            <div key={m.id} className="bg-white border border-slate-200 rounded-xl p-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-sm font-medium text-slate-900">{m.from}</span>
                <span className="text-xs text-slate-400 ml-auto">{m.createdAt}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{m.text}</p>
            </div>
          ))}
          {myMessages.length === 0 && (
            <p className="text-sm text-slate-400 text-center pt-10">No tienes mensajes todavía.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MensajesPage() {
  return (
    <RequireRole roles="vendor" loginPath="/login/vendedor">
      <MensajesContent />
    </RequireRole>
  );
}
