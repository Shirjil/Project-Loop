package com.zidio.projectloopbackend.service;

import com.zidio.projectloopbackend.dto.UserDTO;
import com.zidio.projectloopbackend.entity.User;

import java.util.List;

public interface UserService {

    User registerUser(UserDTO userDTO);

    List<User> getAllUsers();

    User getUserById(Long id);

    User updateUser(Long id, UserDTO userDTO);

    void deleteUser(Long id);

}