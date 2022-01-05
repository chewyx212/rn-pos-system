import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Box,
  PresenceTransition,
  View,
  Image,
  useToast,
  ScrollView,
} from "native-base";
import React from "react";
import { RefreshControl } from "react-native";
import PasscodeInput from "./PasscodeInput";

interface IProps {
  isRefreshing: boolean;
  onRefresh: ()=> void ;
  children: React.ReactNode;
}
const PullToRefreshScrollView = ({ isRefreshing, onRefresh,children }: IProps) => {
  const toast = useToast();
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      >
      {children}
    </ScrollView>
  );
};

export default PullToRefreshScrollView;
