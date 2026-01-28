import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';
interface ProfileAvatarProps {
  avatarUrl?: string;
  marcoUrl?: string;
  size?: number; // Size of the avatar, frame will adjust
}

const ProfileAvatar = ({ avatarUrl, marcoUrl, size = 60 }: ProfileAvatarProps) => {
  const frameSize = size + 10; // Frame slightly larger than avatar

  return (
    <View style={{ width: frameSize, height: frameSize, justifyContent: 'center', alignItems: 'center' }}>
      {/* Avatar Image */}
      {avatarUrl && (
        <Image
          source={{ uri: avatarUrl }}
          style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
        />
      )}

      {/* Marco (Frame) Image */}
      {marcoUrl && (
        <Image
          source={{ uri: marcoUrl }}
          style={[styles.marco, { width: frameSize, height: frameSize, borderRadius: frameSize / 2 }]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    position: 'absolute',
    zIndex: 1, // Avatar is above the frame base
  },
  marco: {
    position: 'absolute',
    zIndex: 2, // Frame is on top of everything
    // The frame image itself should ideally have a transparent center
    // If not, we might need a masking approach, but starting simple.
  },
});

export default ProfileAvatar;
