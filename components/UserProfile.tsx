import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import React from "react";
import { Box, Typography, Avatar } from '@mui/material';
import Image from 'next/image';

const UserProfile: React.FC = () => {
  const { userInfo, isConnected } = useWeb3Auth();

  if (isConnected && userInfo) {
    try {
      return (
        <Box position="sticky" bottom={0} sx={{ px: 4, borderTop: 1, borderColor: 'divider' }}>
          <Box display="flex" alignItems="center" py={4} sx={{ overflow: 'hidden' }}>
            {userInfo.profileImage ? (
              <Image
                src={userInfo.profileImage}
                alt="Profile"
                width={40}
                height={40}
                style={{ borderRadius: '50%' }}
                referrerPolicy="no-referrer"
              />
            ) : (
              <Avatar sx={{ bgcolor: 'purple', width: 40, height: 40 }}>
                {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : ""}
              </Avatar>
            )}
            <Box ml={1.5} sx={{ overflow: 'hidden' }}>
              <Typography variant="body2" noWrap>
                <strong>{userInfo.name || ""}</strong>
              </Typography>
            </Box>
          </Box>
        </Box>
      );
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
};

export default UserProfile;
