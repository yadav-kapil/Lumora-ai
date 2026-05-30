import GeneratePage from "../pages/app/GeneratePage";
import HistoryPage from "../pages/app/HistoryPage";
import FavoritesPage from "../pages/app/FavoritesPage";
import CollectionsPage from "../pages/app/CollectionsPage";
import ProfilePage from "../pages/app/ProfilePage";
import SettingsPage from "../pages/app/SettingsPage";
import BillingPage from "../pages/app/BillingPage";
import ImageToImagePage from "../pages/app/ImageToImagePage";
import UpscalerPage from "../pages/app/UpscalerPage";
import VideoPage from "../pages/app/VideoPage";

export const appRoutes = [
  {
    path: "generate",
    element: <GeneratePage />,
  },
  {
    path: "image-to-image",
    element: <ImageToImagePage />,
  },
  {
    path: "image-upscaler",
    element: <UpscalerPage />,
  },
  {
    path: "text-to-video",
    element: <VideoPage />,
  },
  {
    path: "history",
    element: <HistoryPage />,
  },
  {
    path: "favorites",
    element: <FavoritesPage />,
  },
  {
    path: "collections",
    element: <CollectionsPage />,
  },
  {
    path: "profile",
    element: <ProfilePage />,
  },
  {
    path: "settings",
    element: <SettingsPage />,
  },
  {
    path: "billing",
    element: <BillingPage />,
  }
];
