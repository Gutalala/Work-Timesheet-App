package com.example.profileserver.Controller;

import com.example.profileserver.Domain.Contact;
import com.example.profileserver.Domain.Profile;
import com.example.profileserver.Service.AmazonClient;
import com.example.profileserver.Service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    ProfileService profileService;

    private AmazonClient amazonClient;

    @Autowired
    public void setAmazonClient(AmazonClient amazonClient){this.amazonClient = amazonClient;}

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity getUserProfile(@PathVariable String id){
        return ResponseEntity.ok(profileService.findById(id));
    }

    @CrossOrigin
    @PostMapping("/{id}")
    public ResponseEntity updateProfile(@PathVariable String id, @RequestBody Contact contact){
        profileService.updateContact(id, contact);
        return ResponseEntity.ok("Save Succeed!");
    }

    @CrossOrigin
    @PostMapping(path = "/fileUpload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("userId") String id) {
        System.out.println(file);
        return this.amazonClient.uploadFile(file, id);

    }

}
