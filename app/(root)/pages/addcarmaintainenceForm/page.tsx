/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface MaintenanceItem {
    id: string;
    name: string;
}

const AddCarMaintenanceForm = () => {
    const router = useRouter();
    const toast = useRef<Toast>(null);
    const fileUploadRef = useRef<FileUpload>(null);

    // Form State
    const [licensePlate, setLicensePlate] = useState('');
    const [maintenanceType, setMaintenanceType] = useState('');
    const [maintenanceItems, setMaintenanceItems] = useState<MaintenanceItem[]>([]);
    const [maintenanceCost, setMaintenanceCost] = useState('');
    const [repairShop, setRepairShop] = useState('');
    const [warrantyPeriod, setWarrantyPeriod] = useState('');
    const [previousMeterReading, setPreviousMeterReading] = useState('');
    const [currentMeterReading, setCurrentMeterReading] = useState('');
    const [approvalNumber, setApprovalNumber] = useState('');
    const [maintenanceDate, setMaintenanceDate] = useState<Date | null>(null);
    const [employeeName, setEmployeeName] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [submitted, setSubmitted] = useState(false);

    // Dialog State
    const [itemDialog, setItemDialog] = useState(false);
    const [newItemName, setNewItemName] = useState('');

    // Dropdown Options
    const maintenanceTypes = [
        { label: 'ການບຳລຸງຮັກສາທຳມະດາ', value: 'regular' },
        { label: 'ການສ້ອມແປງ', value: 'repair' },
        { label: 'ການປ່ຽນອາໄຫຼ່', value: 'parts_replacement' },
        { label: 'ການຕິດຕັ້ງອຸປະກອນເສີມ', value: 'installation' },
        { label: 'ອື່ນໆ', value: 'others' }
    ];

    // Available Maintenance Items (from system)


    // Generate ID
    const createId = () => {
        return Math.random().toString(36).substring(2, 11);
    };

    // Open Add Item Dialog
    const openItemDialog = () => {
        setNewItemName('');
        setItemDialog(true);
    };

    // Hide Dialog
    const hideItemDialog = () => {
        setItemDialog(false);
        setNewItemName('');
    };

    // Add Maintenance Item
    const addMaintenanceItem = () => {
        if (newItemName.trim()) {
            const newItem: MaintenanceItem = {
                id: createId(),
                name: newItemName.trim()
            };
            setMaintenanceItems([...maintenanceItems, newItem]);
            toast.current?.show({
                severity: 'success',
                summary: 'ສຳເລັດ',
                detail: 'ເພີ່ມລາຍການສ້ອມແປງສຳເລັດ',
                life: 3000
            });
            hideItemDialog();
        }
    };

    // Remove Maintenance Item
    const removeMaintenanceItem = (id: string) => {
        setMaintenanceItems(maintenanceItems.filter(item => item.id !== id));
        toast.current?.show({
            severity: 'info',
            summary: 'ລົບສຳເລັດ',
            detail: 'ລົບລາຍການສ້ອມແປງສຳເລັດ',
            life: 3000
        });
    };

    // Handle File Upload
    const onFileSelect = (e: any) => {
        const files = e.files;
        const pdfFiles = files.filter((file: File) => file.type === 'application/pdf');

        if (pdfFiles.length !== files.length) {
            toast.current?.show({
                severity: 'warn',
                summary: 'ແຈ້ງເຕືອນ',
                detail: 'ກະລຸນາອັບໂຫຼດເອກະສານໄຟລ .PDF ເທົ່ານັ້ນ',
                life: 3000
            });
        }

        setUploadedFiles([...uploadedFiles, ...pdfFiles]);
    };

    // Remove Uploaded File
    const removeFile = (index: number) => {
        const newFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(newFiles);
    };

    // Validate Form
    const validateForm = () => {
        return (
            licensePlate.trim() &&
            maintenanceType &&
            maintenanceItems.length > 0 &&
            maintenanceCost.trim() &&
            repairShop.trim() &&
            warrantyPeriod.trim() &&
            previousMeterReading.trim() &&
            currentMeterReading.trim() &&
            approvalNumber.trim() &&
            maintenanceDate &&
            employeeName.trim() &&
            uploadedFiles.length > 0
        );
    };

    // Submit Form
    const handleSubmit = () => {
        setSubmitted(true);

        if (validateForm()) {
            // Here you would normally make an API call to save the data
            const formData = {
                licensePlate,
                maintenanceType,
                maintenanceItems,
                maintenanceCost: parseFloat(maintenanceCost),
                repairShop,
                warrantyPeriod,
                previousMeterReading: parseFloat(previousMeterReading),
                currentMeterReading: parseFloat(currentMeterReading),
                approvalNumber,
                maintenanceDate: maintenanceDate?.toISOString(),
                employeeName,
                files: uploadedFiles.map(f => f.name)
            };

            console.log('Form Data:', formData);

            toast.current?.show({
                severity: 'success',
                summary: 'ສຳເລັດ',
                detail: 'ບັນທຶກຂໍ້ມູນການສ້ອມແປງລົດສຳເລັດ',
                life: 3000
            });

            // Navigate back after 1.5 seconds
            setTimeout(() => {
                router.push('/pages/addCarMaintainence');
            }, 1500);
        } else {
            toast.current?.show({
                severity: 'error',
                summary: 'ຜິດພາດ',
                detail: 'ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຄົບຖ້ວນ',
                life: 3000
            });
        }
    };

    // Cancel and Go Back
    const handleCancel = () => {
        router.push('/pages/addcarmaintainence');
    };

    // Item Dialog Footer
    const itemDialogFooter = (
        <>
            <Button
                label="ຍົກເລີກ"
                icon="pi pi-times"
                text
                onClick={hideItemDialog}
            />
            <Button
                label="ເພີ່ມ"
                icon="pi pi-check"
                onClick={addMaintenanceItem}
                disabled={!newItemName.trim()}
            />
        </>
    );

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />

                    {/* Title */}
                    <div className="flex justify-content-center pb-4 mb-3 border-bottom-1 border-gray-200">
                        <h1 className="m-0 text-blue-800">ເພີ່ມຂໍ້ມູນການສ້ອມແປງລົດ</h1>
                    </div>

                    {/* Form */}
                    <div className="p-fluid">
                        <div className="grid">
                            {/* ປ້າຍທະບຽນລົດ */}
                            <div className="col-12 md:col-6">
                                <div className="field">
                                    <label htmlFor="licensePlate" className="font-bold">
                                        ປ້າຍທະບຽນລົດ <span className="text-red-500">*</span>
                                    </label>
                                    <InputText
                                        id="licensePlate"
                                        value={licensePlate}
                                        onChange={(e) => setLicensePlate(e.target.value)}
                                        placeholder="ກະລຸນາປ້ອນປ້າຍທະບຽນລົດ"
                                        className={classNames({
                                            'p-invalid': submitted && !licensePlate.trim()
                                        })}
                                    />
                                    {submitted && !licensePlate.trim() && (
                                        <small className="p-invalid text-red-500">ກະລຸນາປ້ອນປ້າຍທະບຽນລົດ</small>
                                    )}
                                </div>
                            </div>

                            {/* ປະເພດການສ້ອມ */}
                            <div className="col-12 md:col-6">
                                <div className="field">
                                    <label htmlFor="maintenanceType" className="font-bold">
                                        ປະເພດການສ້ອມ <span className="text-red-500">*</span>
                                    </label>
                                    <Dropdown
                                        id="maintenanceType"
                                        value={maintenanceType}
                                        options={maintenanceTypes}
                                        onChange={(e) => setMaintenanceType(e.value)}
                                        placeholder="ເລືອກປະເພດການສ້ອມ"
                                        className={classNames({
                                            'p-invalid': submitted && !maintenanceType
                                        })}
                                    />
                                    {submitted && !maintenanceType && (
                                        <small className="p-invalid text-red-500">ກະລຸນາເລືອກປະເພດການສ້ອມ</small>
                                    )}
                                </div>
                            </div>


                            {/* ມູນຄ່າການສ້ອມແປງ */}
                            <div className="col-12 md:col-6">
                                <div className="field">
                                    <label htmlFor="maintenanceCost" className="font-bold">
                                        ມູນຄ່າການສ້ອມແປງ (ກີບ) <span className="text-red-500">*</span>
                                    </label>
                                    <InputText
                                        id="maintenanceCost"
                                        value={maintenanceCost}
                                        onChange={(e) => setMaintenanceCost(e.target.value)}
                                        placeholder="ກະລຸນາປ້ອນມູນຄ່າການສ້ອມແປງ"
                                        keyfilter="num"
                                        className={classNames({
                                            'p-invalid': submitted && !maintenanceCost.trim()
                                        })}
                                    />
                                    {submitted && !maintenanceCost.trim() && (
                                        <small className="p-invalid text-red-500">ກະລຸນາປ້ອນມູນຄ່າການສ້ອມແປງ</small>
                                    )}
                                </div>
                            </div>

                            {/* ຮ້ານສ້ອມແປງລົດ */}
                            <div className="col-12 md:col-6">
                                <div className="field">
                                    <label htmlFor="repairShop" className="font-bold">
                                        ຮ້ານສ້ອມແປງລົດ <span className="text-red-500">*</span>
                                    </label>
                                    <InputText
                                        id="repairShop"
                                        value={repairShop}
                                        onChange={(e) => setRepairShop(e.target.value)}
                                        placeholder="ກະລຸນາປ້ອນຊື່ຮ້ານສ້ອມແປງລົດ"
                                        className={classNames({
                                            'p-invalid': submitted && !repairShop.trim()
                                        })}
                                    />
                                    {submitted && !repairShop.trim() && (
                                        <small className="p-invalid text-red-500">ກະລຸນາປ້ອນຊື່ຮ້ານສ້ອມແປງລົດ</small>
                                    )}
                                </div>
                            </div>

                            {/* ໄລຍະຮັບປະກັນ */}
                            <div className="col-12 md:col-6">
                                <div className="field">
                                    <label htmlFor="warrantyPeriod" className="font-bold">
                                        ໄລຍະຮັບປະກັນ <span className="text-red-500">*</span>
                                    </label>
                                    <InputText
                                        id="warrantyPeriod"
                                        value={warrantyPeriod}
                                        onChange={(e) => setWarrantyPeriod(e.target.value)}
                                        placeholder="ເຊັ່ນ: 3 ເດືອນ, 6 ເດືອນ, 1 ປີ"
                                        className={classNames({
                                            'p-invalid': submitted && !warrantyPeriod.trim()
                                        })}
                                    />
                                    {submitted && !warrantyPeriod.trim() && (
                                        <small className="p-invalid text-red-500">ກະລຸນາປ້ອນໄລຍະຮັບປະກັນ</small>
                                    )}
                                </div>
                            </div>

                            {/* ເລກກົງເຕີ້ຄັ້ງກ່ອນ */}
                            <div className="col-12 md:col-6">
                                <div className="field">
                                    <label htmlFor="previousMeterReading" className="font-bold">
                                        ເລກກົງເຕີ້ຄັ້ງກ່ອນ (ກິໂລແມັດ) <span className="text-red-500">*</span>
                                    </label>
                                    <InputText
                                        id="previousMeterReading"
                                        value={previousMeterReading}
                                        onChange={(e) => setPreviousMeterReading(e.target.value)}
                                        placeholder="ກະລຸນາປ້ອນເລກກົງເຕີ້ຄັ້ງກ່ອນ"
                                        keyfilter="num"
                                        className={classNames({
                                            'p-invalid': submitted && !previousMeterReading.trim()
                                        })}
                                    />
                                    {submitted && !previousMeterReading.trim() && (
                                        <small className="p-invalid text-red-500">ກະລຸນາປ້ອນເລກກົງເຕີ້ຄັ້ງກ່ອນ</small>
                                    )}
                                </div>
                            </div>

                            {/* ເລກກົງເຕີ້ຄັ້ງນີ້ */}
                            <div className="col-12 md:col-6">
                                <div className="field">
                                    <label htmlFor="currentMeterReading" className="font-bold">
                                        ເລກກົງເຕີ້ຄັ້ງນີ້ (ກິໂລແມັດ) <span className="text-red-500">*</span>
                                    </label>
                                    <InputText
                                        id="currentMeterReading"
                                        value={currentMeterReading}
                                        onChange={(e) => setCurrentMeterReading(e.target.value)}
                                        placeholder="ກະລຸນາປ້ອນເລກກົງເຕີ້ຄັ້ງນີ້"
                                        keyfilter="num"
                                        className={classNames({
                                            'p-invalid': submitted && !currentMeterReading.trim()
                                        })}
                                    />
                                    {submitted && !currentMeterReading.trim() && (
                                        <small className="p-invalid text-red-500">ກະລຸນາປ້ອນເລກກົງເຕີ້ຄັ້ງນີ້</small>
                                    )}
                                </div>
                            </div>

                            {/* ເລກທີ່ອະນຸມັດ */}
                            <div className="col-12 md:col-6">
                                <div className="field">
                                    <label htmlFor="approvalNumber" className="font-bold">
                                        ເລກທີ່ອະນຸມັດ <span className="text-red-500">*</span>
                                    </label>
                                    <InputText
                                        id="approvalNumber"
                                        value={approvalNumber}
                                        onChange={(e) => setApprovalNumber(e.target.value)}
                                        placeholder="ກະລຸນາປ້ອນເລກທີ່ອະນຸມັດ"
                                        className={classNames({
                                            'p-invalid': submitted && !approvalNumber.trim()
                                        })}
                                    />
                                    {submitted && !approvalNumber.trim() && (
                                        <small className="p-invalid text-red-500">ກະລຸນາປ້ອນເລກທີ່ອະນຸມັດ</small>
                                    )}
                                </div>
                            </div>

                            {/* ວັນທີສ້ອມແປງ */}
                            <div className="col-12 md:col-6">
                                <div className="field">
                                    <label htmlFor="maintenanceDate" className="font-bold">
                                        ວັນທີສ້ອມແປງ <span className="text-red-500">*</span>
                                    </label>
                                    <Calendar
                                        id="maintenanceDate"
                                        value={maintenanceDate}
                                        onChange={(e) => setMaintenanceDate(e.value as Date)}
                                        dateFormat="dd/mm/yy"
                                        placeholder="ເລືອກວັນທີສ້ອມແປງ"
                                        showIcon
                                        className={classNames({
                                            'p-invalid': submitted && !maintenanceDate
                                        })}
                                    />
                                    {submitted && !maintenanceDate && (
                                        <small className="p-invalid text-red-500">ກະລຸນາເລືອກວັນທີສ້ອມແປງ</small>
                                    )}
                                </div>
                            </div>

                            {/* ພະນັກງານເອົາລົດໄປແປງ */}
                            <div className="col-12 md:col-6">
                                <div className="field">
                                    <label htmlFor="employeeName" className="font-bold">
                                        ພະນັກງານເອົາລົດໄປແປງ <span className="text-red-500">*</span>
                                    </label>
                                    <InputText
                                        id="employeeName"
                                        value={employeeName}
                                        onChange={(e) => setEmployeeName(e.target.value)}
                                        placeholder="ກະລຸນາປ້ອນຊື່ພະນັກງານ"
                                        className={classNames({
                                            'p-invalid': submitted && !employeeName.trim()
                                        })}
                                    />
                                    {submitted && !employeeName.trim() && (
                                        <small className="p-invalid text-red-500">ກະລຸນາປ້ອນຊື່ພະນັກງານ</small>
                                    )}
                                </div>
                            </div>

                            {/* ເພີ່ມເອກະສານອ້າງອີງ */}
                            <div className="col-12">
                                <div className="field">
                                    <label className="font-bold">
                                        ເພີ່ມເອກະສານອ້າງອີງ (.PDF ເທົ່ານັ້ນ) <span className="text-red-500">*</span>
                                    </label>
                                    <FileUpload
                                        ref={fileUploadRef}
                                        name="documents"
                                        accept="application/pdf"
                                        multiple
                                        customUpload
                                        auto
                                        uploadHandler={onFileSelect}
                                        emptyTemplate={
                                            <p className="m-0">
                                                ລາກແລະວາງໄຟລ PDF ໃສ່ບ່ອນນີ້ເພື່ອອັບໂຫຼດ
                                            </p>
                                        }
                                        chooseLabel="ເລືອກໄຟລ"
                                        className={classNames({
                                            'p-invalid': submitted && uploadedFiles.length === 0
                                        })}
                                    />

                                    {/* Display Uploaded Files */}
                                    {uploadedFiles.length > 0 && (
                                        <div className="mt-3">
                                            <p className="font-bold mb-2">ໄຟລທີ່ອັບໂຫຼດ:</p>
                                            {uploadedFiles.map((file, index) => (
                                                <div key={index} className="flex align-items-center justify-content-between p-2 border-1 border-gray-300 border-round mb-2">
                                                    <span className="flex align-items-center gap-2">
                                                        <i className="pi pi-file-pdf text-red-500" />
                                                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                                    </span>
                                                    <Button
                                                        icon="pi pi-times"
                                                        rounded
                                                        text
                                                        severity="danger"
                                                        onClick={() => removeFile(index)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {submitted && uploadedFiles.length === 0 && (
                                        <small className="p-invalid text-red-500">ກະລຸນາອັບໂຫຼດເອກະສານອ້າງອີງຢ່າງໜ້ອຍ 1 ໄຟລ</small>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-content-end gap-2 mt-4">
                            <Button
                                label="ຍົກເລີກ"
                                icon="pi pi-times"
                                severity="secondary"
                                onClick={handleCancel}
                            />
                            <Button
                                label="ບັນທຶກຂໍ້ມູນ"
                                icon="pi pi-check"
                                onClick={handleSubmit}
                                className="bg-blue-800 border-none"
                            />
                        </div>
                    </div>

                    {/* Add Maintenance Item Dialog */}
                    <Dialog
                        visible={itemDialog}
                        style={{ width: '450px' }}
                        header="ເພີ່ມລາຍການສ້ອມແປງ"
                        modal
                        className="p-fluid"
                        footer={itemDialogFooter}
                        onHide={hideItemDialog}
                    >

                        <div className="field">
                            <label htmlFor="itemName" className="font-bold">
                                ຊື່ລາຍການສ້ອມແປງ <span className="text-red-500">*</span>
                            </label>
                            <InputTextarea
                                id="itemName"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                rows={3}
                                placeholder="ເຊັ່ນ: ປ່ຽນນ້ຳມັນເຄື່ອງ, ປ່ຽນຢາງລົດ, ແກ້ໄຂລະບົບເບກ"
                                autoFocus
                            />
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default AddCarMaintenanceForm;
