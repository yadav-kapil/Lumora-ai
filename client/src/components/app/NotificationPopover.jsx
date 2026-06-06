import { useAppContext } from "../../context/app/AppContext";
import { useAuthContext } from "../../context/auth/AuthContext";
import { useToast } from "../../context/ToastContext";
import { useLoading } from "../../context/LoadingContext";
import { RiCheckLine } from "react-icons/ri";

export default function NotificationPopover({ isOpen, onClose }) {
  const { notifications, dispatch } = useAppContext();
  const { user, accessToken } = useAuthContext();
  const { showToast } = useToast();
  const { showLoading, hideLoading } = useLoading();

  const handleMarkAsRead = async (id) => {
    showLoading("Updating notification", "Marking notification as read...");
    try {
      const res = await fetch(`/api/library/notification/${id}/read`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to mark notification as read");
      }

      dispatch({
        type: "MARK_NOTIFICATION_READ",
        payload: data.notification,
      });

      showToast("Notification marked as read", "success", "Updated");
    } catch (err) {
      console.error(err);
      showToast(err.message || "Something went wrong", "error", "Failed");
    } finally {
      hideLoading();
    }
  };

  return (
    <div
      className={`absolute right-0 top-13 z-50 w-80 max-h-[400px] overflow-y-auto rounded-2xl border border-slate-100 bg-white/95 p-3 shadow-[0_8px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl transition-all duration-300 ease-out ${
        isOpen
          ? "visible translate-y-0 scale-100 opacity-100 pointer-events-auto"
          : "invisible -translate-y-3 scale-95 opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
          Notifications
        </h3>
        {notifications.length > 0 && (
          <span className="text-[9px] font-black px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-md">
            {notifications.filter((n) => !n.markByUsers.includes(user?._id)).length} unread
          </span>
        )}
      </div>

      <div className="space-y-2">
        {notifications.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-xs font-bold text-slate-400">No notifications yet</p>
          </div>
        ) : (
          notifications.map((n) => {
            const isRead = n.markByUsers.includes(user?._id);
            return (
              <div
                key={n._id}
                className={`p-2.5 rounded-xl border transition-all ${
                  isRead
                    ? "border-slate-100/50 bg-slate-50/20 text-slate-500"
                    : "border-emerald-50 bg-emerald-50/5 text-slate-800 font-semibold"
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-xs font-bold tracking-tight text-slate-900 leading-snug">
                    {n.title}
                  </h4>
                  {isRead ? (
                    <span className="shrink-0 inline-flex items-center gap-0.5 text-[9px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                      <RiCheckLine size={10} /> Read
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMarkAsRead(n._id)}
                      className="shrink-0 text-[9px] font-black text-white bg-gradient-to-r from-emerald-500 to-emerald-600 px-2 py-0.5 rounded-md shadow-md shadow-emerald-100/30 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
                <p className="mt-1 text-[10px] font-semibold text-slate-450 leading-relaxed">
                  {n.desc}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
