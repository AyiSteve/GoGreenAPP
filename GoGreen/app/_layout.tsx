import { Tabs } from "expo-router";
import GoGreenHeader from "../components/GoGreenHeader";
import MyCameraTabBar from "../components/MyCameraTabBar";

const COLORS = { bg: "#F2E6B8", pill: "#8ED168" };

export default function RootTabs() {
  return (
    <Tabs
      initialRouteName="camera"
      screenOptions={{
        header: () => (
          <GoGreenHeader title="GoGreen" colors={{ pill: COLORS.pill, bg: COLORS.bg }} />
        ),
        // Use our custom bottom bar (this removes the default triangles)
        tabBar: (props) => <MyCameraTabBar {...props} />,
        tabBarShowLabel: false,
        sceneStyle: { backgroundColor: COLORS.bg },
      }}
    >
      {/* Only two tabs */}
      <Tabs.Screen name="camera" options={{ title: "Camera" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    
    {/* Hidden, still navigable */}
    <Tabs.Screen name="wallet" options={{ href: null }} />
    <Tabs.Screen name="redeem" options={{ href: null }} />
    </Tabs>
  );
}
