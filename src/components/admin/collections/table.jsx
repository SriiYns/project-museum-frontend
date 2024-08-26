import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import QRCodeLib from 'qrcode';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios'; // Sesuaikan path jika diperlukan

const CollectionTable = ({ collections, handleDelete }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [scanCounts, setScanCounts] = useState({});

    useEffect(() => {
        const fetchScanCounts = async () => {
            const counts = {};
            for (const collection of collections) {
                try {
                    const response = await axios.get(`/historyScanCollection/${collection._id}/count`);
                    counts[collection._id] = response.data.count;
                } catch (error) {
                    console.error('Error fetching scan count', error);
                    counts[collection._id] = 0; // Set default value if error occurs
                }
            }
            setScanCounts(counts);
        };
    
        fetchScanCounts();
    }, [collections]);

    const handleDownload = async (collectionId) => {
        try {
            const url = `${window.location.origin}/collection/${collectionId}`;
            const dataUrl = await QRCodeLib.toDataURL(url, {
                width: 256,
                height: 256,
            });
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `${collectionId}-qrcode.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error generating QR code', error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('collection.title')}</CardTitle>
                <CardDescription>{t('collection.description')}</CardDescription>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='hidden md:table-cell'>
                                Gambar
                            </TableHead>
                            <TableHead className='w-60'>Judul</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead>Tahun</TableHead>
                            <TableHead className='hidden md:table-cell'>
                                Indonesia
                            </TableHead>
                            <TableHead className='hidden md:table-cell'>
                                Inggris
                            </TableHead>
                            <TableHead className='hidden md:table-cell'>
                                Sasak
                            </TableHead>
                            <TableHead className='hidden md:table-cell'>
                                QR Code
                            </TableHead>
                            <TableHead className='hidden md:table-cell'>
                                Jumlah Scan
                            </TableHead>
                            <TableHead>
                                <span className='sr-only'>Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {collections.map((collection) => (
                            <TableRow key={collection._id} className='bg-white'>
                                
                                <TableCell className='hidden md:table-cell'>
                                    <div className='p-2 border rounded-lg border-zinc-200'>
                                        <img
                                            src={collection.image}
                                            alt={collection.judul_id}
                                            className='object-cover w-32 rounded-md aspect-square'
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className='font-medium'>
                                    <Link to={`/collection/${collection._id}`}>
                                        {collection.judul_id}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Badge variant='outline'>
                                        {collection.kategori}
                                    </Badge>
                                </TableCell>
                                <TableCell>{collection.tahun}</TableCell>
                                <TableCell className='hidden md:table-cell'>
                                    <p className='text-muted-foreground line-clamp-2'>
                                        {collection.deskripsi_id}
                                    </p>
                                </TableCell>
                                <TableCell className='hidden md:table-cell'>
                                    <p className='text-muted-foreground line-clamp-2'>
                                        {collection.deskripsi_en}
                                    </p>
                                </TableCell>
                                <TableCell className='hidden md:table-cell'>
                                    <p className='text-muted-foreground line-clamp-2'>
                                        {collection.deskripsi_sasak}
                                    </p>
                                </TableCell>
                                <TableCell className='hidden md:table-cell'>
                                    <QRCode
                                        value={`${window.location.origin}/collection/${collection._id}`}
                                        size={64}
                                    />
                                </TableCell>
                                <TableCell className='hidden md:table-cell'>
                                    <p className='text-muted-foreground'>
                                        {scanCounts[collection._id] || 0}
                                    </p>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                aria-haspopup='true'
                                                size='icon'
                                                variant='ghost'>
                                                <MoreHorizontal className='w-4 h-4' />
                                                <span className='sr-only'>
                                                    Toggle menu
                                                </span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align='end'>
                                            <DropdownMenuLabel>
                                                Actions
                                            </DropdownMenuLabel>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    navigate(
                                                        '/admin/collection/' +
                                                            collection._id
                                                    )
                                                }>
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    handleDelete(collection._id)
                                                }>
                                                Delete
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    handleDownload(
                                                        collection._id
                                                    )
                                                }>
                                                Download
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

CollectionTable.propTypes = {
    collections: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,

            judul_id: PropTypes.string,
            judul_en: PropTypes.string,
            judul_sasak: PropTypes.string,

            description: PropTypes.string,
            tahun: PropTypes.number,
            kategori: PropTypes.string,
            tag: PropTypes.arrayOf(PropTypes.string),
            image: PropTypes.string,

            deskripsi_en: PropTypes.string,
            deskripsi_id: PropTypes.string,
            deskripsi_sasak: PropTypes.string,

            audio_id: PropTypes.string,
            audio_en: PropTypes.string,
            audio_sasak: PropTypes.string,

            createdAt: PropTypes.string,
            updatedAt: PropTypes.string,
        })
    ),
    handleDelete: PropTypes.func,
};

export default CollectionTable;
