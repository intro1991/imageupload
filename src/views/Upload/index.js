import { useState, useCallback } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Stack,
  Switch,
  Container,
  CardHeader,
  Typography,
  CardContent,
  FormControlLabel
} from '@material-ui/core';

import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';

import UploadMultiFile from './UploadMultiFile';

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function Upload() {
  const [preview, setPreview] = useState(true);
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile({
        ...file,
        preview: URL.createObjectURL(file)
      });
    }
  }, []);

  const handleDropAvatar = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setAvatarUrl({
        ...file,
        preview: URL.createObjectURL(file)
      });
    }
  }, []);

  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFiles]
  );

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const handleRemove = (file) => {
    const filteredItems = files.filter((_file) => _file !== file);
    setFiles(filteredItems);
  };

  return (
    <RootStyle title="KTL_ImageUpload">
      <Box
        sx={{
          pt: 6,
          pb: 1,
          mb: 10,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800')
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={5}>
            <Card>
              <CardHeader
                title="Upload Multi File"
                action={
                  <FormControlLabel
                    control={<Switch checked={preview} onChange={(event) => setPreview(event.target.checked)} />}
                    label="Show Preview"
                  />
                }
              />
              <CardContent>
                <UploadMultiFile
                  showPreview={preview}
                  files={files}
                  onDrop={handleDropMultiFile}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                />
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Box>
    </RootStyle>
  );
}
