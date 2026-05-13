
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { useToast } from '@/hooks/use-toast.js';

const OTPVerificationModal = ({ isOpen, onClose, email, otpId, onSuccess }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (code.length !== 8) {
      toast({ title: "Lỗi", description: "Mã OTP phải gồm 8 chữ số.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      // Save current admin session before verifying OTP
      const adminToken = pb.authStore.token;
      const adminModel = pb.authStore.model;

      // Verify OTP (this will temporarily overwrite the authStore with the new user's session)
      await pb.collection('users').authWithOTP(otpId, code, { $autoCancel: false });
      
      // Restore admin session immediately so the admin remains logged in
      pb.authStore.save(adminToken, adminModel);
      
      toast({ title: "Thành công", description: "Tài khoản đã tạo thành công" });
      onSuccess();
      onClose();
      navigate('/admin');
    } catch (error) {
      console.error('OTP verification error:', error);
      toast({ title: "Lỗi", description: "Mã OTP không hợp lệ hoặc đã hết hạn.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open && !loading) onClose(); }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xác thực tài khoản</DialogTitle>
          <DialogDescription>
            Mã xác thực gồm 8 chữ số đã được gửi đến email <strong>{email}</strong>.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleVerify} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="otp-code">Mã OTP (8 chữ số)</Label>
            <Input 
              id="otp-code" 
              type="text" 
              maxLength={8} 
              placeholder="00000000" 
              value={code} 
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} 
              required 
              className="text-center text-2xl tracking-widest"
            />
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Bỏ qua</Button>
            <Button type="submit" disabled={loading || code.length !== 8} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Xác thực
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OTPVerificationModal;
