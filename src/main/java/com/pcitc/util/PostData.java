package com.pcitc.util;

import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;


public class PostData {
	/***
	 * post发送支付申请
	 * **/
	public static String toGetData(String address,String params){
		System.out.println(params);
		URL url =null;
		HttpURLConnection httpurlconnection=null;
		StringBuilder result = new StringBuilder();
		try{
		    url = new URL(address);
		    // 以post方式请求
		    httpurlconnection = (HttpURLConnection) url.openConnection();
		    httpurlconnection.setDoOutput(true);
		    httpurlconnection.setRequestMethod("POST");
		   // httpurlconnection.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
		   
		    if(null!=params&&params.length()>0){
		        httpurlconnection.getOutputStream().write(params.getBytes());
		        httpurlconnection.getOutputStream().flush();
		        httpurlconnection.getOutputStream().close();
		    }
		    // 获取页面内容
		    java.io.InputStream in = httpurlconnection.getInputStream();
		    java.io.BufferedReader breader = new java.io.BufferedReader(new InputStreamReader(in,"utf-8"));
		    String str = breader.readLine();
		    while (str != null) {
		        result.append(str);
		        str = breader.readLine();
		    }
		    breader.close();
		    in.close();
		} catch (Exception e) {
		     e.printStackTrace();
		} finally {
		    if (httpurlconnection != null)
		        httpurlconnection.disconnect();
		}
		return result.toString().trim();
	}

}
