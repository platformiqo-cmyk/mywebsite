
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Plus, Pencil, Trash2, Shield, User as UserIcon, Eye, AlertTriangle, Bug } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { useToast } from '@/hooks/use-toast.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import EditUserModal from './EditUserModal.jsx';
import DeleteUserModal from './DeleteUserModal.jsx';
import OTPVerificationModal from './OTPVerificationModal.jsx';

const UserManagement = () => {
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('list');
  
  // Modals state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [otpData, setOtpData] = useState({ email: '', otpId: '' });

  // Form state
  const initialFormState = { email: '', password: '', role: 'viewer' };
  const [formData, setFormData] = useState(initialFormState);

  const fetchUsers = async () => {
    if (currentUser?.role !== 'admin') return;
    
    console.log('--- DEBUG: Starting fetchUsers() ---');
    console.log('Current User ID:', currentUser?.id);
    console.log('Current User Role:', currentUser?.role);
    
    setLoading(true);
    try {
      // Task 3: Fetch ALL users with NO filters, NO role restrictions, and NO sorting
      const records = await pb.collection('users').getFullList({
        $autoCancel: false
      });
      
      // Task 1: Comprehensive logging
      console.log('--- DEBUG: fetchUsers() Success ---');
      console.log('Raw API response:', records);
      console.log('Number of records returned:', records.length);
      records.forEach((r, index) => {
        console.log(`Record [${index}]: id=${r.id}, email=${r.email}, role=${r.role}`);
      });

      setUsers(records);
    } catch (error) {
      console.error('--- DEBUG: fetchUsers() Error ---');
      console.error('Error fetching users:', error);
      toast({ title: "Lỗi", description: "Không thể tải danh sách người dùng. " + error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      fetchUsers();
    }
  }, [currentUser]);

  // Security check: Prevent non-admins from accessing the create tab
  useEffect(() => {
    if (activeTab === 'create' && currentUser?.role !== 'admin') {
      setActiveTab('list');
      toast({ 
        title: "Lỗi truy cập", 
        description: "Chỉ quản trị viên mới có thể tạo tài khoản", 
        variant: "destructive" 
      });
    }
  }, [activeTab, currentUser, toast]);

  // Role-based access protection for the entire component
  if (currentUser?.role !== 'admin') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center max-w-2xl mx-auto mt-8">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Truy cập bị từ chối</h2>
        <p className="text-gray-600 mb-8 text-lg">Bạn không có quyền truy cập quản lý người dùng.</p>
        <Button 
          onClick={() => navigate('/admin')} 
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-xl"
        >
          Quay lại Dashboard
        </Button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast({ title: "Lỗi", description: "Vui lòng nhập email và mật khẩu.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      // 1. Create user with explicit role assignment
      const newUser = await pb.collection('users').create({
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.password,
        role: formData.role
      }, { $autoCancel: false });
      
      // 2. Request OTP for verification
      const otpResult = await pb.collection('users').requestOTP(formData.email, { $autoCancel: false });
      
      toast({ title: "Thành công", description: `Đã tạo tài khoản với vai trò ${formData.role}. Vui lòng xác thực OTP.` });
      setFormData(initialFormState);
      fetchUsers();
      
      // 3. Open OTP Modal
      setOtpData({ email: formData.email, otpId: otpResult.otpId });
      setOtpModalOpen(true);
      
    } catch (error) {
      console.error('Create user error:', error);
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin': return <Shield className="w-4 h-4 text-red-500 mr-1" />;
      case 'editor': return <Pencil className="w-4 h-4 text-blue-500 mr-1" />;
      default: return <Eye className="w-4 h-4 text-gray-500 mr-1" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      
      {/* Task 2: Debug Panel to verify database state and rules */}
      <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm font-mono">
        <div className="flex items-center mb-2 text-slate-800">
          <Bug className="w-4 h-4 mr-2" />
          <h3 className="font-bold">Debug Information</h3>
        </div>
        <div className="space-y-1 text-slate-600">
          <p>Current User: <span className="font-semibold">{currentUser?.email}</span> (Role: <span className="font-semibold">{currentUser?.role}</span>)</p>
          <p>Total Users Fetched: <span className="font-semibold">{users.length}</span></p>
          {users.length === 1 && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded text-amber-800">
              <p className="font-semibold flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                WARNING: Only 1 user returned!
              </p>
              <p className="mt-1">
                This is caused by PocketBase collection rules. The 'users' collection listRule is currently set to <code>id = @request.auth.id</code>. 
                This means even admins can only fetch their own record. To fix this, the database listRule needs to be updated to: 
                <code>id = @request.auth.id || @request.auth.role = 'admin'</code>
              </p>
            </div>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="list">Danh sách</TabsTrigger>
          <TabsTrigger value="create">Tạo tài khoản mới</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-emerald-600" /></div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Vai trò</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">Không có người dùng nào.</TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>
                          <div className="flex items-center capitalize">
                            {getRoleIcon(user.role)}
                            {user.role || 'viewer'}
                          </div>
                        </TableCell>
                        <TableCell>
                          {user.verified ? (
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-medium">Đã xác thực</span>
                          ) : (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-xs font-medium">Chưa xác thực</span>
                          )}
                        </TableCell>
                        <TableCell>{new Date(user.created).toLocaleDateString('vi-VN')}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => openEditModal(user)} className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => openDeleteModal(user)} 
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            title="Xóa người dùng"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="create">
          <form onSubmit={handleCreateSubmit} className="space-y-6 max-w-md">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required placeholder="user@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu <span className="text-red-500">*</span></Label>
                <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} required minLength={8} />
              </div>
              <div className="space-y-2">
                <Label>Vai trò (Role)</Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="pt-4">
              <Button type="submit" disabled={submitting} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                Tạo tài khoản
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>

      <EditUserModal 
        isOpen={editModalOpen} 
        onClose={() => setEditModalOpen(false)} 
        user={selectedUser} 
        onSuccess={fetchUsers} 
      />
      <DeleteUserModal 
        isOpen={deleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)} 
        user={selectedUser} 
        onSuccess={fetchUsers} 
      />
      <OTPVerificationModal
        isOpen={otpModalOpen}
        onClose={() => {
          setOtpModalOpen(false);
          setActiveTab('list');
        }}
        email={otpData.email}
        otpId={otpData.otpId}
        onSuccess={() => {
          fetchUsers();
          setActiveTab('list');
        }}
      />
    </div>
  );
};

export default UserManagement;
